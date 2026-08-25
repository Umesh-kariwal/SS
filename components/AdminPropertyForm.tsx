'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  X,
  Plus,
  Image as ImageIcon,
  Check,
  Star,
  Trash2,
  Video,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface PropertyImageItem {
  imageUrl: string;
  isCover: boolean;
  sortOrder: number;
}

interface AdminPropertyFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const DEFAULT_LOCATIONS = ['Debari', 'Nathdwara', 'Daroli', 'Navaniya', 'Dabok', 'Mavli'];
const DEFAULT_TYPES = ['Plot', 'Villa', 'Commercial', 'House', 'Land'];
const DEFAULT_UNITS = ['sq.ft', 'Bigha', 'Gaj', 'Acres'];
const DEFAULT_STATUSES = ['Available', 'Sold', 'Reserved', 'Coming Soon', 'Draft'];
const SUGGESTED_FEATURES = [
  'Road Access',
  'Corner Plot',
  'Water Available',
  'Electricity Available',
  'Gated Area',
  'Residential Area',
  'Commercial Potential',
  'Clear Title Registry',
  'Near Highway',
  'Tubewell Borewell',
];

export default function AdminPropertyForm({ initialData, isEdit = false }: AdminPropertyFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [propertyType, setPropertyType] = useState(initialData?.propertyType || 'Plot');
  const [location, setLocation] = useState(initialData?.location || 'Debari');
  const [address, setAddress] = useState(initialData?.address || '');
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '');
  const [priceDisplay, setPriceDisplay] = useState(initialData?.priceDisplay || '');
  const [area, setArea] = useState(initialData?.area ? String(initialData.area) : '');
  const [areaUnit, setAreaUnit] = useState(initialData?.areaUnit || 'sq.ft');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'Available');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');

  // Features state
  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.map((f: any) => f.feature) || ['Road Access', 'Clear Title Registry']
  );
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Images state (default to empty or initialData without duplicate hardcoded fallback)
  const [images, setImages] = useState<PropertyImageItem[]>(() => {
    if (initialData?.images && initialData.images.length > 0) {
      return deduplicateImages(
        initialData.images.map((img: any, idx: number) => ({
          imageUrl: img.imageUrl,
          isCover: img.isCover || idx === 0,
          sortOrder: idx,
        }))
      );
    }
    return [];
  });

  // Sync state if initialData loads asynchronously
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setPropertyType(initialData.propertyType || 'Plot');
      setLocation(initialData.location || 'Debari');
      setAddress(initialData.address || '');
      setPrice(initialData.price ? String(initialData.price) : '');
      setPriceDisplay(initialData.priceDisplay || '');
      setArea(initialData.area ? String(initialData.area) : '');
      setAreaUnit(initialData.areaUnit || 'sq.ft');
      setShortDescription(initialData.shortDescription || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'Available');
      setIsFeatured(initialData.isFeatured || false);
      setVideoUrl(initialData.videoUrl || '');
      if (initialData.features) {
        setFeatures(initialData.features.map((f: any) => f.feature));
      }
      if (initialData.images) {
        setImages(
          deduplicateImages(
            initialData.images.map((img: any, idx: number) => ({
              imageUrl: img.imageUrl,
              isCover: img.isCover || idx === 0,
              sortOrder: idx,
            }))
          )
        );
      }
    }
  }, [initialData]);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Deduplicate helper function
  function deduplicateImages(imgList: PropertyImageItem[]): PropertyImageItem[] {
    const seen = new Set<string>();
    const result: PropertyImageItem[] = [];

    for (const item of imgList) {
      if (!seen.has(item.imageUrl)) {
        seen.add(item.imageUrl);
        result.push(item);
      }
    }

    // Ensure at least one image is marked as cover
    if (result.length > 0 && !result.some((i) => i.isCover)) {
      result[0].isCover = true;
    }

    return result.map((item, idx) => ({ ...item, sortOrder: idx }));
  }

  // Handle image upload to /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const newUrls: string[] = data.urls || [];
      const updatedList = [
        ...images,
        ...newUrls.map((url, idx) => ({
          imageUrl: url,
          isCover: images.length === 0 && idx === 0,
          sortOrder: images.length + idx,
        })),
      ];

      setImages(deduplicateImages(updatedList));
    } catch (err: any) {
      setError(err.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleSetCover = (index: number) => {
    setImages(
      images.map((img, idx) => ({
        ...img,
        isCover: idx === index,
      }))
    );
  };

  const handleRemoveImage = (index: number) => {
    const filtered = images.filter((_, idx) => idx !== index);
    if (images[index]?.isCover && filtered.length > 0) {
      filtered[0].isCover = true;
    }
    setImages(deduplicateImages(filtered));
  };

  const handleAddFeature = (featureName: string) => {
    const trimmed = featureName.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures([...features, trimmed]);
    }
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (featureName: string) => {
    setFeatures(features.filter((f) => f !== featureName));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!title || !price || !area) {
      setError('Please fill in all required fields (Title, Price, Area).');
      setSaving(false);
      return;
    }

    try {
      const finalImages = deduplicateImages(images);

      const payload = {
        title,
        propertyType,
        location,
        address,
        price,
        priceDisplay: priceDisplay || `₹ ${price}`,
        area,
        areaUnit,
        shortDescription,
        description,
        status,
        isFeatured,
        videoUrl: videoUrl || null,
        features,
        images: finalImages,
      };

      const url = isEdit ? `/api/properties/${initialData.id}` : '/api/properties';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save property');
      }

      router.push('/admin/properties');
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif font-bold text-brand-slate">
              {isEdit ? 'Edit Property Listing' : 'Create New Property'}
            </h1>
            <p className="text-xs text-brand-slateMuted font-normal">
              Enter full specifications, location data, features, and upload photos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEdit ? 'Update Listing' : 'Publish Listing'}</span>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Basic Information Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
        <h2 className="text-lg font-serif font-bold text-brand-slate border-b border-slate-100 pb-3">
          1. Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Property Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Premium Highway Residential Plot"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Property Type *
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            >
              {DEFAULT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Service Location *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            >
              {DEFAULT_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Address / Landmark
            </label>
            <input
              type="text"
              placeholder="e.g. Near Debari Bypass Highway, Debari, Udaipur, Rajasthan"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Price & Dimensions */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
        <h2 className="text-lg font-serif font-bold text-brand-slate border-b border-slate-100 pb-3">
          2. Price & Area Specs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Price (Numeric ₹) *
            </label>
            <input
              type="number"
              required
              placeholder="3500000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Price Display Text
            </label>
            <input
              type="text"
              placeholder="₹ 35 Lakhs"
              value={priceDisplay}
              onChange={(e) => setPriceDisplay(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Area Size *
            </label>
            <input
              type="number"
              step="any"
              required
              placeholder="2400"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Area Unit *
            </label>
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            >
              {DEFAULT_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Property Status & Featured */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
        <h2 className="text-lg font-serif font-bold text-brand-slate border-b border-slate-100 pb-3">
          3. Status & Visibility Controls
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Property Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            >
              {DEFAULT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
              <span className="text-xs font-bold text-brand-slate uppercase tracking-wider">
                Mark as Featured Property on Homepage
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 4. Descriptions */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
        <h2 className="text-lg font-serif font-bold text-brand-slate border-b border-slate-100 pb-3">
          4. Descriptions & Overview
        </h2>

        <div>
          <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
            Short Description (Card preview text)
          </label>
          <input
            type="text"
            placeholder="Prime 40x60 ft residential plot right off national highway with 30ft road."
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
            Full Detailed Description
          </label>
          <textarea
            rows={5}
            placeholder="Comprehensive description of boundary, registry status, surrounding area, water source, electrical availability..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>
      </div>

      {/* 5. Features Tags */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
        <h2 className="text-lg font-serif font-bold text-brand-slate border-b border-slate-100 pb-3">
          5. Property Features & Amenities
        </h2>

        {/* Selected feature badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((f) => (
            <span
              key={f}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-brand-bronze text-xs font-bold flex items-center gap-1.5"
            >
              <span>{f}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(f)}
                className="hover:text-red-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Add custom feature input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add feature tag (e.g. 3-Phase Power, Gated Entry...)"
            value={newFeatureInput}
            onChange={(e) => setNewFeatureInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:border-brand-gold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleAddFeature(newFeatureInput)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-white flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tag</span>
          </button>
        </div>

        {/* Suggested chips */}
        <div className="pt-2">
          <div className="text-[11px] text-brand-slateMuted font-bold mb-2">Quick Add Suggestions:</div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_FEATURES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleAddFeature(s)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 border border-slate-200"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Media Management (Multi-Image Upload & YouTube Video) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
        <h2 className="text-lg font-serif font-bold text-brand-slate border-b border-slate-100 pb-3">
          6. Property Media (Photos & Video)
        </h2>

        <div>
          <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
            YouTube / Video Tour URL (Optional)
          </label>
          <div className="relative">
            <Video className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Multi-Image File Uploader */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider">
            Property Photo Gallery
          </label>

          <div className="border-2 border-dashed border-slate-300 hover:border-brand-gold rounded-2xl p-6 text-center bg-slate-50 transition-colors">
            <Upload className="w-8 h-8 text-brand-gold mx-auto mb-2" />
            <div className="text-xs text-brand-slate font-bold mb-1">
              Click or drag photos to upload
            </div>
            <div className="text-[11px] text-brand-slateMuted font-medium mb-4">
              Supports JPG, PNG, WEBP. First image or selected star image will be used as cover photo.
            </div>

            <label className="px-5 py-3 rounded-xl bg-brand-slate hover:bg-slate-800 text-xs font-bold text-white cursor-pointer inline-flex items-center gap-2 shadow-sm">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                  <span>Uploading File...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 text-brand-gold" />
                  <span>Choose Photo Files</span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Uploaded image previews (Deduplicated) */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {images.map((img, idx) => (
                <div
                  key={`${img.imageUrl}-${idx}`}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 group bg-slate-100 shadow-sm ${
                    img.isCover ? 'border-brand-gold ring-2 ring-amber-400' : 'border-slate-300'
                  }`}
                >
                  <img src={img.imageUrl} alt="preview" className="w-full h-full object-cover" />

                  {/* Cover Badge */}
                  {img.isCover && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-brand-gold text-white shadow-sm">
                      Cover
                    </span>
                  )}

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="p-2 rounded-lg bg-amber-500 text-white hover:brightness-110"
                      title="Set as Cover Photo"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
