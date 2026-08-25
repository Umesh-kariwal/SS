'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Copy, Check, Loader2, Trash2 } from 'lucide-react';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (e) {
      console.error('Failed to fetch media:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchMedia();
      }
    } catch (e) {
      console.error('Upload failed:', e);
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Upload and manage property photographs, logos, and site media
          </p>
        </div>

        <label className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 cursor-pointer self-start sm:self-auto">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading Media...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload New Photos</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
          <p className="text-sm text-slate-600 font-medium">Loading media assets...</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
          <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-slate-900">No Media Files Uploaded</h3>
          <p className="text-xs text-slate-500 font-medium">
            Upload property photos using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((media) => (
            <div
              key={media.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group hover:border-brand-gold transition-all"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img src={media.url} alt={media.filename} className="w-full h-full object-cover" />
              </div>

              <div className="p-3 space-y-2">
                <div className="text-xs font-bold text-slate-900 truncate" title={media.filename}>
                  {media.filename}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{(media.size / 1024).toFixed(1)} KB</span>
                  <span>{new Date(media.createdAt).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => handleCopyUrl(media.url)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  {copiedUrl === media.url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied URL!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Copy Image URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
