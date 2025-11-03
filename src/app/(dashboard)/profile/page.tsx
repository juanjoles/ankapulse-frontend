'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userApi } from '@/lib/api';

interface UserProfile {
  id: string;
  nombre: string;
  email: string;
  provider?: string;
  createdAt: string;
  isActive: boolean;
  emailVerified: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''});
  
  // Estados para edición
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
   
    const response = await userApi.getProfile();

    // Tu backend devuelve: { status: 'success', data: { user } }
    const userData = response.data.data?.user || response.data.data || response.data;
    
    
    setProfile(userData);
    setTempName(userData.nombre || '');
    setTempEmail(userData.email || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      showErrorModal('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const showSuccessModal = (message: string) => {
    setShowModal({type: 'success', message});
    setTimeout(() => setShowModal({type: null, message: ''}), 3000);
  };

  const showErrorModal = (message: string) => {
    setShowModal({type: 'error', message});
    setTimeout(() => setShowModal({type: null, message: ''}), 3000);
  };

const updateProfile = async (data: { nombre?: string; email?: string }) => {
  try {
    setSaving(true);
    const response = await userApi.updateProfile(data);
    
    // ✨ EXTRAER datos del response anidado (como en fetchProfile)
    const updatedUser = response.data.data?.user || response.data.data || response.data;
    
    // ✨ ACTUALIZAR profile y valores temporales
    setProfile(updatedUser);
    setTempName(updatedUser.nombre || '');
    setTempEmail(updatedUser.email || '');
    
    if (data.email) {
      setEditingEmail(false);
      showSuccessModal('Email actualizado exitosamente');
    }
    
    if (data.nombre) {
      setEditingName(false);
      showSuccessModal('Nombre actualizado exitosamente');
    }
  } catch (error: any) {
    console.error('Error updating profile:', error);
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Error al actualizar perfil';
    showErrorModal(errorMessage);
  } finally {
    setSaving(false);
  }
};

  const handleNameSave = () => {
    if (tempName.trim() === '') {
      showErrorModal('El nombre no puede estar vacío');
      return;
    }
    updateProfile({ nombre: tempName.trim() });
  };

  const handleEmailSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempEmail)) {
      showErrorModal('Formato de email inválido');
      return;
    }
    updateProfile({ email: tempEmail.trim() });
  };

  const cancelNameEdit = () => {
    setTempName(profile?.nombre || '');
    setEditingName(false);
  };

  const cancelEmailEdit = () => {
    setTempEmail(profile?.email || '');
    setEditingEmail(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground">Error al cargar el perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-muted-foreground">
              Gestiona tu información personal y configuraciones de cuenta
            </p>
          </div>
        </div>

        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Actualiza tu nombre y email asociado a la cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              {editingName ? (
                <div className="flex space-x-2">
                  <Input
                    id="name"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Tu nombre completo"
                    disabled={saving}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleNameSave}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={cancelNameEdit}
                    disabled={saving}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-foreground">{profile.nombre}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setEditingName(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {editingEmail ? (
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="tu@email.com"
                    disabled={saving}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleEmailSave}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={cancelEmailEdit}
                    disabled={saving}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-foreground">{profile.email}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setEditingEmail(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Información de la Cuenta */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>
              Detalles de tu cuenta en AnkaPulse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Método de registro</Label>
                <p className="text-foreground capitalize">
                  {profile.provider === 'email' ? 'Email y contraseña' : 
                   profile.provider === 'google' ? 'Google' : 
                   profile.provider === 'github' ? 'GitHub' : 
                   profile.provider || 'Email'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Email verificado</Label>
                <p className="text-foreground">
                  {profile.emailVerified ? (
                    <span className="text-green-600">✅ Verificado</span>
                  ) : (
                    <span className="text-yellow-600">⏳ Pendiente</span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Estado de la cuenta</Label>
                <p className="text-foreground">
                  {profile.isActive ? (
                    <span className="text-green-600">🟢 Activa</span>
                  ) : (
                    <span className="text-red-600">🔴 Inactiva</span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Miembro desde</Label>
                <p className="text-foreground">
                  {new Date(profile.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Modal de notificación */}
        {showModal.type && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`
              bg-white dark:bg-gray-800 rounded-lg p-6 mx-4 max-w-md w-full shadow-xl transform transition-all
              ${showModal.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {showModal.type === 'success' ? (
                    <div className="bg-green-100 p-2 rounded-full">
                      <Save className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  <p className={`font-medium ${
                    showModal.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {showModal.message}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal({type: null, message: ''})}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}