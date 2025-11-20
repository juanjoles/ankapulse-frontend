'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, Save, Copy, ExternalLink, AlertTriangle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { userApi } from '@/lib/api';
import { LocaleLink as Link } from '@/components/locale-link';

// Switch component inline
const Switch = ({ checked, onCheckedChange, disabled = false, id }: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${checked ? 'bg-blue-600' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

// Alert component inline
const Alert = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
    {children}
  </div>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm text-orange-800">{children}</div>
);

interface AlertSettings {
  emailAlertsEnabled: boolean;
  telegramAlertsEnabled: boolean;
  telegramChatId: string;
  canUseTelegram: boolean;
}

export default function AlertsPage() {
  const t = useTranslations('alerts');
  const [settings, setSettings] = useState<AlertSettings>({
    emailAlertsEnabled: true,
    telegramAlertsEnabled: false,
    telegramChatId: '',
    canUseTelegram: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTelegramInstructions, setShowTelegramInstructions] = useState(false);
  const [showModal, setShowModal] = useState<{type: 'success' | 'error' | 'copy' | null, message: string}>({type: null, message: ''});

  useEffect(() => {
    fetchAlertSettings();
  }, []);

  const fetchAlertSettings = async () => {
    try {
      const response = await userApi.getAlertSettings();
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching alert settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const showSuccessModal = () => {
    setShowModal({type: 'success', message: t('messages.saveSuccess')});
    setTimeout(() => setShowModal({type: null, message: ''}), 3000);
  };

  const showErrorModal = () => {
    setShowModal({type: 'error', message: t('messages.saveError')});
    setTimeout(() => setShowModal({type: null, message: ''}), 3000);
  };

  const showCopyModal = () => {
    setShowModal({type: 'copy', message: t('messages.linkCopied')});
    setTimeout(() => setShowModal({type: null, message: ''}), 2000);
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await userApi.updateAlertSettings({
        emailAlertsEnabled: settings.emailAlertsEnabled,
        telegramAlertsEnabled: settings.telegramAlertsEnabled,
        telegramChatId: settings.telegramChatId.trim()
      });
      
      setSettings(prev => ({ ...prev, ...response.data.settings }));
      showSuccessModal();
      
    } catch (error: any) {
      console.error('Error saving settings:', error);
      showErrorModal();
    } finally {
      setSaving(false);
    }
  };

  const copyBotLink = () => {
    navigator.clipboard.writeText('@ankapulse_alerts_bot');
    showCopyModal();
  };

  const openTelegramBot = () => {
    window.open('https://t.me/ankapulse_alerts_bot', '_blank');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Bell className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Email Alerts Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <CardTitle>{t('email.title')}</CardTitle>
            </div>
            <CardDescription>
              {t('email.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-alerts">{t('email.enable')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('email.availableAllPlans')}
                </p>
              </div>
              <Switch
                id="email-alerts"
                checked={settings.emailAlertsEnabled}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, emailAlertsEnabled: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Telegram Alerts Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <CardTitle className="flex items-center space-x-2">
                <span>{t('telegram.title')}</span>
                {settings.canUseTelegram ? (
                  <Badge variant="secondary">{t('telegram.premium')}</Badge>
                ) : (
                  <Badge variant="outline">{t('telegram.starterPro')}</Badge>
                )}
              </CardTitle>
            </div>
            <CardDescription>
              {t('telegram.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!settings.canUseTelegram && (
              <Alert>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <AlertDescription>
                    {t('telegram.upgradeRequired')}
                    <Link href="/pricing">
                      <Button variant="link" className="p-0 h-auto ml-1">
                        {t('telegram.upgradePlan')}
                      </Button>
                    </Link>
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="telegram-alerts">{t('telegram.enable')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('telegram.pushNotifications')}
                </p>
              </div>
              <Switch
                id="telegram-alerts"
                checked={settings.telegramAlertsEnabled}
                disabled={!settings.canUseTelegram}
                onCheckedChange={(checked) => {
                  setSettings(prev => ({ ...prev, telegramAlertsEnabled: checked }));
                  if (checked && !settings.telegramChatId) {
                    setShowTelegramInstructions(true);
                  }
                }}
              />
            </div>

            {settings.canUseTelegram && settings.telegramAlertsEnabled && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="telegram-chat-id">{t('telegram.chatIdLabel')}</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="telegram-chat-id"
                      placeholder={t('telegram.chatIdPlaceholder')}
                      value={settings.telegramChatId}
                      onChange={(e) => 
                        setSettings(prev => ({ ...prev, telegramChatId: e.target.value }))
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowTelegramInstructions(!showTelegramInstructions)}
                    >
                      ?
                    </Button>
                  </div>
                </div>

                {(showTelegramInstructions || !settings.telegramChatId) && (
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-3">{t('telegram.instructions.title')}</h4>
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                          <div>
                            <span>{t('telegram.instructions.step1')}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                                @ankapulse_alerts_bot
                              </code>
                              <Button size="sm" variant="outline" onClick={copyBotLink}>
                                <Copy className="h-3 w-3 mr-1" />
                                {t('telegram.instructions.copy')}
                              </Button>
                              <Button size="sm" variant="outline" onClick={openTelegramBot}>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                {t('telegram.instructions.open')}
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                          <span>{t('telegram.instructions.step2')} <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/start</code></span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                          <span>{t('telegram.instructions.step3')}</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                          <span>{t('telegram.instructions.step4')}</span>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          {/* <Button 
            variant="outline" 
            onClick={() => fetchAlertSettings()}
            disabled={saving}
          >
            {t('actions.cancel')}
          </Button> */}
          <Button 
            onClick={saveSettings}
            disabled={saving}
            className="min-w-[120px]"
          >
            {saving ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{t('actions.saving')}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{t('actions.save')}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Preview Card */}
        <Card className="bg-gray-50 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-lg">{t('preview.title')}</CardTitle>
            <CardDescription>
              {t('preview.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.emailAlertsEnabled && (
              <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{t('email.title')}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>{t('preview.emailFrom')}</strong> alerts@ankapulse.app<br />
                  <strong>{t('preview.emailSubject')}</strong> {t('preview.emailSubjectText')}<br />
                  <strong>{t('preview.emailBody')}</strong> {t('preview.emailBodyText')}
                </div>
              </div>
            )}
            
            {settings.telegramAlertsEnabled && settings.canUseTelegram && (
              <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{t('telegram.title')}</span>
                </div>
                <div className="text-sm bg-green-50 dark:bg-green-950/20 p-3 rounded border-l-4 border-green-500">
                  🚨 <strong>{t('preview.telegramAlert')}</strong><br /><br />
                  <strong>{t('preview.service')}</strong> Mi API<br />
                  <strong>{t('preview.url')}</strong> https://mi-api.com<br />
                  <strong>{t('preview.status')}</strong> 500 ❌<br />
                  <strong>{t('preview.region')}</strong> us-east<br />
                  <strong>{t('preview.time')}</strong> 31/10/2025, 15:30:00<br /><br />
                  <strong>{t('preview.error')}</strong> Internal Server Error<br /><br />
                  <a href="#" className="text-blue-500 underline">{t('preview.viewDetails')}</a>
                </div>
              </div>
            )}

            {!settings.emailAlertsEnabled && !settings.telegramAlertsEnabled && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t('preview.noAlerts')}</p>
                <p className="text-sm">{t('preview.enableAtLeastOne')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de notificación */}
        {showModal.type && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`
              bg-white dark:bg-gray-800 rounded-lg p-6 mx-4 max-w-md w-full shadow-xl transform transition-all
              ${showModal.type === 'success' ? 'border-l-4 border-green-500' : 
                showModal.type === 'error' ? 'border-l-4 border-red-500' : 
                'border-l-4 border-blue-500'}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {showModal.type === 'success' && (
                    <div className="bg-green-100 p-2 rounded-full">
                      <Save className="h-5 w-5 text-green-600" />
                    </div>
                  )}
                  {showModal.type === 'error' && (
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  {showModal.type === 'copy' && (
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Copy className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  <p className={`font-medium ${
                    showModal.type === 'success' ? 'text-green-800 dark:text-green-200' : 
                    showModal.type === 'error' ? 'text-red-800 dark:text-red-200' : 
                    'text-blue-800 dark:text-blue-200'
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