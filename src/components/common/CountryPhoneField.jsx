import React from 'react'
import { getFlagEmoji } from '../../hooks/useCountryGeo'

const CountryPhoneField = ({
  geo,
  value,
  onChange,
  name = 'phoneNumber',
  placeholder,
  required = false,
  className = '',
  dropdownDirection = 'down', // 'down' or 'up'
}) => {
  const {
    selectedCountry,
    setSelectedCountry,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    dropdownRef,
    filteredCountries,
  } = geo

  const dynamicPlaceholder =
    placeholder ||
    (selectedCountry.dial_code === '+92'
      ? '300 1234567'
      : selectedCountry.dial_code === '+1'
      ? '(555) 000-0000'
      : '123 456 7890')

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Phone Input Bar */}
      <div className="flex items-center w-full bg-[#0c1015] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#0099ff] focus-within:ring-1 focus-within:ring-[#0099ff] transition-all">
        {/* Country Flag & Dial Code Trigger */}
        <button
          type="button"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen)
            setSearchQuery('')
          }}
          className="flex items-center gap-2 px-3.5 py-3.5 bg-white/[0.03] hover:bg-white/[0.07] border-r border-white/10 shrink-0 select-none cursor-pointer transition-colors"
          aria-label="Select country code"
          aria-expanded={isDropdownOpen}
        >
          {/* Country Flag Image with Emoji fallback */}
          <div className="w-6 h-4 rounded-xs overflow-hidden shrink-0 shadow-xs ring-1 ring-white/15 bg-black/40 flex items-center justify-center">
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              onError={(e) => {
                e.target.style.display = 'none'
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-block'
              }}
              className="w-full h-full object-cover"
            />
            <span className="hidden text-sm leading-none">
              {getFlagEmoji(selectedCountry.code)}
            </span>
          </div>

          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            {selectedCountry.dial_code}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ease-out ${
              isDropdownOpen ? 'rotate-180 text-[#0099ff]' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Phone Input */}
        <input
          type="tel"
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={dynamicPlaceholder}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
        />

        {/* Hidden full phone value for standard submission */}
        <input
          type="hidden"
          name={`full_${name}`}
          value={`${selectedCountry.dial_code} ${value}`.trim()}
        />
      </div>

      {/* Searchable Dropdown Modal */}
      {isDropdownOpen && (
        <div
          className={`absolute left-0 w-full sm:w-[360px] max-w-[calc(100vw-2rem)] bg-[#090d12] border border-white/15 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(0,153,255,0.15)] z-[70] overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 ${
            dropdownDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {/* Search Header */}
          <div className="p-3 border-b border-white/10 bg-white/[0.02]">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute left-3.5 text-[#0099ff] pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or dial code..."
                autoFocus
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff]/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Countries List */}
          <div className="max-h-[260px] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-1.5 space-y-0.5">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-400">
                No countries match "{searchQuery}"
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry.code === c.code
                return (
                  <button
                    key={`${c.code}-${c.dial_code}`}
                    type="button"
                    onClick={() => setSelectedCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-all group cursor-pointer ${
                      isSelected
                        ? 'bg-[#0099ff]/15 text-white border border-[#0099ff]/35 shadow-sm'
                        : 'text-slate-200 hover:bg-white/[0.07] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate pr-2">
                      <div className="w-6 h-4 rounded-xs overflow-hidden shrink-0 shadow-xs ring-1 ring-white/15 bg-black/40 flex items-center justify-center">
                        <img
                          src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                          alt={c.name}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            if (e.target.nextSibling)
                              e.target.nextSibling.style.display = 'inline-block'
                          }}
                          className="w-full h-full object-cover"
                        />
                        <span className="hidden text-sm leading-none">
                          {getFlagEmoji(c.code)}
                        </span>
                      </div>
                      <span
                        className={`truncate text-xs sm:text-sm font-medium ${
                          isSelected ? 'text-[#0099ff]' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {c.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-sm text-xs font-mono font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#0099ff]/25 text-[#0099ff] border border-[#0099ff]/40'
                            : 'bg-white/[0.05] border border-white/5 text-zinc-400 group-hover:text-[#0099ff] group-hover:border-[#0099ff]/30 group-hover:bg-[#0099ff]/10'
                        }`}
                      >
                        {c.dial_code}
                      </span>
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-[#0099ff]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountryPhoneField

