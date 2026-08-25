'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminPropertyForm from '@/components/AdminPropertyForm';
import { Loader2 } from 'lucide-react';

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/properties/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProperty(data);
      }
    } catch (e) {
      console.error('Failed to fetch property details:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
        <p className="text-sm text-gray-400">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-8 text-center text-white">
        <h2 className="text-xl font-bold">Property Not Found</h2>
      </div>
    );
  }

  return <AdminPropertyForm initialData={property} isEdit={true} />;
}
