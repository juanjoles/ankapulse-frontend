'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useStatusPage } from '@/hooks/useStatusPage';
import { useChecks } from '@/hooks/useChecks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SlugInput } from '@/components/status-page/SlugInput';
import { MonitorSelector } from '@/components/status-page/MonitorSelector';
import { Globe, Loader2, ExternalLink, AlertCircle, Trash2 } from 'lucide-react';
import { LocaleLink as Link } from '@/components/locale-link';

export default function StatusPageConfigPage() {
  const t = useTranslations('statusPage');
  const router = useRouter();
  const { config, loading, createOrUpdate, disable, checkSlugAvailability } = useStatusPage();
  const { checks } = useChecks();
  
  const [slug, setSlug] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [disabling, setDisabling] = useState(false);

  // Cargar datos existentes
  useEffect(() => {
    if (config) {
      setSlug(config.slug);
      setEnabled(config.enabled);
      setTitle(config.title || '');
      setDescription(config.description || '');
      setSelectedMonitors(config.monitors?.map(m => m.checkId) || []);
    }
  }, [config]);

  const handleSave = async () => {
    if (!slug.trim()) {
      return;
    }

    setSaving(true);
    try {
      await createOrUpdate({
        slug: slug.trim(),
        enabled,
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        monitorIds: selectedMonitors,
      });
    } catch (err) {
      // Error ya manejado por el hook
    } finally {
      setSaving(false);
    }
  };

  const handleDisable = async () => {
    if (!confirm(t('actions.confirmDisable'))) {
      return;
    }

    setDisabling(true);
    try {
      await disable();
    } catch (err) {
      // Error ya manejado por el hook
    } finally {
      setDisabling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const publicUrl = config 
    ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://ankapulse.app'}/status/${config.slug}`
    : null;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('subtitle')}
        </p>
      </div>

      {/* Public URL Card (si ya existe) */}
      {config && config.enabled && publicUrl && (
        <Alert>
          <Globe className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold mb-1">{t('publicUrl')}</p>
                <a 
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline font-mono flex items-center gap-1"
                >
                  {publicUrl}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Warning si no tiene checks */}
      {checks.length === 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {t('noChecks.message')}
            <Link href="/checks/new" className="font-semibold underline ml-1">
              {t('noChecks.action')}
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Config Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('config.sectionTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Enabled Switch */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('config.enabled.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('config.enabled.description')}
              </p>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {/* Slug */}
          <SlugInput
            value={slug}
            onChange={setSlug}
            checkAvailability={checkSlugAvailability}
            disabled={saving}
          />

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t('config.pageTitle.label')}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('config.pageTitle.placeholder')}
              disabled={saving}
            />
            <p className="text-sm text-muted-foreground">
              {t('config.pageTitle.description')}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t('config.description.label')}</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('config.description.placeholder')}
              disabled={saving}
            />
          </div>

          {/* Monitor Selector */}
          <MonitorSelector
            checks={checks}
            selectedIds={selectedMonitors}
            onChange={setSelectedMonitors}
            disabled={saving}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving || !slug.trim() || checks.length === 0}
              className="flex-1"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('actions.saving')}
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  {config ? t('actions.update') : t('actions.create')}
                </>
              )}
            </Button>

            {config && (
              <Button
                variant="destructive"
                onClick={handleDisable}
                disabled={disabling || saving}
              >
                {disabling ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}