import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getLocations } from "../services/cabService";

const AutocompleteInput = ({
  placeholder,
  value,
  setValue,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const boxRef = useRef(null);

  // FETCH SUGGESTIONS
  const fetchSuggestions = async (val) => {
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const data = await getLocations(val);
      setSuggestions(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  return (
    <div
      className="temple-autocomplete"
      ref={boxRef}
    >
      <FaMapMarkerAlt className="location-icon" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          fetchSuggestions(val);
        }}
      />

      {suggestions.length > 0 && (
        <div className="temple-suggestions">
          {suggestions
            .slice(0, 5)
            .map((item, index) => (
              <div
                key={index}
                className="temple-suggestion-item"
                onClick={() => {
                  setValue(item.city_name);
                  setSuggestions([]);
                }}
              >
                <FaMapMarkerAlt />

                {item.city_name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;