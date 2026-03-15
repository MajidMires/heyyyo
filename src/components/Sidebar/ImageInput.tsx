import React from 'react';
import { X } from 'lucide-react';

interface ImageInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  helpText?: string;
  showPreview?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  value,
  placeholder = 'https://example.com/image.jpg',
  onChange,
  helpText,
  showPreview = true,
}) => {
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (newValue: string) => {
    setError('');
    onChange(newValue);

    if (newValue && showPreview) {
      setIsLoading(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    if (value) {
      setError('Failed to load image');
    }
  };

  const isVideo = value && (value.includes('.mp4') || value.includes('.webm') || value.includes('.mov'));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        {value && (
          <button
            onClick={() => handleChange('')}
            className="px-2 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}

      {error && (
        <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md">{error}</p>
      )}

      {showPreview && value && !error && (
        <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
          {isVideo ? (
            <video
              className="w-full h-32 object-cover rounded-md bg-black"
              controls
              onLoadedMetadata={handleImageLoad}
              onError={handleImageError}
            >
              <source src={value} />
            </video>
          ) : (
            <>
              {isLoading && (
                <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-500">Loading...</span>
                </div>
              )}
              <img
                src={value}
                alt="Preview"
                className={`w-full h-32 object-cover rounded-md ${isLoading ? 'hidden' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
