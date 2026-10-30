/**
 * ============================================================================
 * APOLLO GROUP TV - GOOGLE APPS SCRIPT BACKEND API
 * ============================================================================
 * 
 * This script runs inside Google Sheets as a serverless Web App API.
 * It manages:
 *  1. User Registration ('signup') -> Stored in "Users" sheet
 *  2. User Authentication ('login')  -> Validates against "Users" sheet
 *  3. Free Trial Requests ('freetrial') -> Stored in "Trials" sheet
 * 
 * DEPLOYMENT INSTRUCTIONS:
 *  1. Open your Google Sheet.
 *  2. Click Extensions > Apps Script.
 *  3. Delete any code in the editor and paste this entire file.
 *  4. Click "Save" (disk icon).
 *  5. Click "Deploy" > "New deployment".
 *  6. Select type: "Web app" (click gear icon next to 'Select type').
 *  7. Set Description: "Apollo Group TV API v1".
 *  8. Set "Execute as": "Me (your email)".
 *  9. Set "Who has access": "Anyone"  <-- CRITICAL!
 * 10. Click "Deploy". Grant permissions when prompted.
 * 11. Copy the "Web app URL" (ends in /exec).
 * 12. Paste the URL into your project's `.env` file as:
 *       VITE_GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/.../exec
 * ============================================================================
 */

function doGet(e) {
  return respondJSON({
    status: "ok",
    message: "Apollo Group TV Google Sheet API is live and operational!",
    timestamp: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var data = {};
    
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      data = e.parameter || {};
    }

    var action = (data.action || "").toLowerCase().trim();
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ------------------------------------------------------------------------
    // 1. ACTION: SIGNUP
    // ------------------------------------------------------------------------
    if (action === "signup") {
      var sheet = getOrCreateSheet(ss, "Users", [
        "ID", "Created At", "First Name", "Last Name", "Username",
        "Email", "Country", "State", "Phone", "Password", "Promo Code"
      ]);

      var email = (data.email || "").toLowerCase().trim();
      var username = (data.username || "").toLowerCase().trim();

      if (!email && !username) {
        return respondJSON({ success: false, message: "Email or username is required." });
      }

      // Check if user already exists
      var values = sheet.getDataRange().getValues();
      for (var i = 1; i < values.length; i++) {
        var rowUsername = String(values[i][4] || "").toLowerCase().trim();
        var rowEmail = String(values[i][5] || "").toLowerCase().trim();

        if (email && rowEmail === email) {
          return respondJSON({ success: false, message: "An account with this email already exists." });
        }
        if (username && rowUsername === username) {
          return respondJSON({ success: false, message: "This username is already taken. Please choose another." });
        }
      }

      var newId = "USR-" + Utilities.getUuid().substring(0, 8).toUpperCase();
      var now = new Date().toISOString();

      sheet.appendRow([
        newId,
        now,
        data.firstName || "",
        data.lastName || "",
        data.username || "",
        data.email || "",
        data.country || "",
        data.state || "",
        data.phoneNumber || "",
        data.password || "",
        data.promoCode || ""
      ]);

      return respondJSON({
        success: true,
        message: "Account registered successfully!",
        user: {
          id: newId,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          email: data.email || "",
          country: data.country || "",
          state: data.state || "",
          phoneNumber: data.phoneNumber || ""
        }
      });
    }

    // ------------------------------------------------------------------------
    // 2. ACTION: LOGIN
    // ------------------------------------------------------------------------
    if (action === "login") {
      var sheet = getOrCreateSheet(ss, "Users", [
        "ID", "Created At", "First Name", "Last Name", "Username",
        "Email", "Country", "State", "Phone", "Password", "Promo Code"
      ]);

      var identifier = (data.identifier || "").toLowerCase().trim();
      var password = data.password || "";

      if (!identifier || !password) {
        return respondJSON({ success: false, message: "Please provide both identifier and password." });
      }

      var values = sheet.getDataRange().getValues();
      var matchedUser = null;

      for (var i = 1; i < values.length; i++) {
        var rowId = String(values[i][0] || "");
        var rowFirstName = String(values[i][2] || "");
        var rowLastName = String(values[i][3] || "");
        var rowUsername = String(values[i][4] || "");
        var rowEmail = String(values[i][5] || "");
        var rowCountry = String(values[i][6] || "");
        var rowState = String(values[i][7] || "");
        var rowPhone = String(values[i][8] || "");
        var rowPassword = String(values[i][9] || "");

        if (
          rowUsername.toLowerCase().trim() === identifier ||
          rowEmail.toLowerCase().trim() === identifier
        ) {
          if (rowPassword === password) {
            matchedUser = {
              id: rowId,
              firstName: rowFirstName,
              lastName: rowLastName,
              username: rowUsername,
              email: rowEmail,
              country: rowCountry,
              state: rowState,
              phoneNumber: rowPhone
            };
            break;
          } else {
            return respondJSON({ success: false, message: "Incorrect password. Please try again." });
          }
        }
      }

      if (matchedUser) {
        return respondJSON({
          success: true,
          message: "Login successful! Welcome back, " + (matchedUser.firstName || matchedUser.username) + ".",
          user: matchedUser
        });
      }

      return respondJSON({
        success: false,
        message: "No account found matching this username or email."
      });
    }

    // ------------------------------------------------------------------------
    // 3. ACTION: FREE TRIAL
    // ------------------------------------------------------------------------
    if (action === "freetrial") {
      var trialSheet = getOrCreateSheet(ss, "Trials", [
        "ID", "Created At", "Full Name", "Email", "Phone",
        "Country", "Device", "App", "Notes"
      ]);

      var trialId = "TRL-" + Utilities.getUuid().substring(0, 8).toUpperCase();
      var now = new Date().toISOString();

      trialSheet.appendRow([
        trialId,
        now,
        data.fullName || "",
        data.email || "",
        data.phone || "",
        data.country || "",
        data.device || "",
        data.app || "",
        data.notes || ""
      ]);

      return respondJSON({
        success: true,
        message: "Free trial request recorded successfully!",
        trialId: trialId
      });
    }

    return respondJSON({
      success: false,
      message: "Unrecognized action: " + action
    });

  } catch (err) {
    return respondJSON({
      success: false,
      error: err.toString()
    });
  }
}

/**
 * Helper to get or create sheet with headers
 */
function getOrCreateSheet(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0099ff");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Standard JSON response helper with CORS headers
 */
function respondJSON(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

