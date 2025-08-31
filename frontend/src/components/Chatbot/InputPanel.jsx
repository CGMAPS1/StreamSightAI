import React, { useRef, useState } from 'react';
import { UploadIcon, VideoIcon, SendToBackendIcon, ClearIcon, RefreshIcon } from './Icons';

const UploadModule = ({ onFileSelect, isProcessing }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (!isProcessing) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset input to allow same file selection again
    event.target.value = '';
  };

  return (
    <div
      onClick={handleUploadClick}
      className={`relative p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[120px] sm:min-h-[140px] lg:min-h-[180px] ${
        !isProcessing
          ? 'cursor-pointer hover:border-blue-500 hover:bg-blue-50/50'
          : 'cursor-wait opacity-50'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="video/*,image/*"
        disabled={isProcessing}
      />
      <UploadIcon />
      <p className="text-sm sm:text-base text-gray-700 font-semibold mt-2">
        {isProcessing ? 'Processing...' : 'Upload Video/Image'}
      </p>
      <p className="text-xs text-gray-500 mt-1 px-2">
        {isProcessing ? 'Please wait...' : 'Click here to select a file'}
      </p>
    </div>
  );
};

const FilePreview = ({
  file,
  prompt,
  setPrompt,
  onSend,
  onClear,
  isProcessing,
}) => {
  const [previewError, setPreviewError] = useState(false);
  const videoURL = URL.createObjectURL(file);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isVideo = file.type.startsWith('video/');
  const isImage = file.type.startsWith('image/');

  return (
    <div className="flex-1 flex flex-col gap-3 sm:gap-4 overflow-hidden">
      {/* Media Preview - Responsive aspect ratio */}
      <div className="w-full aspect-video bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-inner">
        {previewError ? (
          <div className="w-full h-full flex items-center justify-center text-white p-4">
            <div className="text-center">
              <VideoIcon />
              <p className="mt-2 text-sm sm:text-base">Preview unavailable</p>
              <p className="text-xs sm:text-sm opacity-75 truncate max-w-full">{file.name}</p>
            </div>
          </div>
        ) : isVideo ? (
          <video
            src={videoURL}
            controls
            className="w-full h-full object-cover"
            onError={() => setPreviewError(true)}
          />
        ) : isImage ? (
          <img
            src={videoURL}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setPreviewError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white p-4">
            <div className="text-center">
              <VideoIcon />
              <p className="mt-2 text-sm sm:text-base">File uploaded</p>
              <p className="text-xs sm:text-sm opacity-75 truncate max-w-full">{file.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* File Information - Responsive layout */}
      <div className="p-2 sm:p-3 bg-white/80 rounded-lg border border-gray-200/80 flex items-center gap-2 sm:gap-3">
        <div className="flex-shrink-0">
          <VideoIcon />
        </div>
        <div className="flex-1 overflow-hidden min-w-0">
          <p
            className="font-semibold text-xs sm:text-sm text-gray-800 truncate"
            title={file.name}
          >
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
          </p>
        </div>
        <button
          onClick={onClear}
          disabled={isProcessing}
          className="flex-shrink-0 p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
          title="Remove file"
        >
          <ClearIcon />
        </button>
      </div>

      {/* User Prompt Input - Responsive sizing */}
      <div className="space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt about the video/image..."
          className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none resize-none text-sm sm:text-base"
          rows="2"
          disabled={isProcessing}
        />
        <p className="text-xs text-gray-500 px-1">
          Tip: Be specific about what you want to analyze
        </p>
      </div>

      {/* Action Button - Responsive sizing */}
      <div className="mt-auto pt-2 sm:pt-4">
        <button
          onClick={onSend}
          disabled={isProcessing || !prompt.trim()}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-full py-2.5 sm:py-3 px-4 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <SendToBackendIcon />
              Send for Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const InputPanel = ({ onVideoUpload, isProcessing, analysisResults, onReset, currentFile }) => {
  const [selectedFile, setSelectedFile] = useState(currentFile);
  const [userPrompt, setUserPrompt] = useState('');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSendToBackend = () => {
    if (selectedFile && userPrompt.trim()) {
      onVideoUpload({ file: selectedFile, prompt: userPrompt.trim() });
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUserPrompt('');
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-lg h-full p-3 sm:p-4 lg:p-6 flex flex-col gap-3 sm:gap-4">
      {/* Header - Responsive text sizes */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
          Media Analysis
        </h2>
        {selectedFile && (
          <button
            onClick={onReset}
            className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            title="Start new analysis"
          >
            <RefreshIcon />
          </button>
        )}
      </div>

      {/* Content Area */}
      {selectedFile ? (
        <FilePreview
          file={selectedFile}
          prompt={userPrompt}
          setPrompt={setUserPrompt}
          onSend={handleSendToBackend}
          onClear={handleClearFile}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-center px-2">
            Upload a video or image file to start AI analysis. You can then chat about the content and ask follow-up questions.
          </p>
          <UploadModule
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />
          <div className="mt-3 sm:mt-4 text-xs text-gray-500 text-center space-y-1">
            <p>Supported: MP4, AVI, MOV, WebM, JPG, PNG</p>
            <p>Max size: 100MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPanel;
