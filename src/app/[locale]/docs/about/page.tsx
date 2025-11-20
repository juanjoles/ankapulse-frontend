'use client';

import { Heart, Code, DollarSign, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Hero Story */}
      <div className="bg-card border rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center gap-3">
          <Heart className="w-6 h-6 text-primary" />
          {t('story.title')}
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            {t('story.p1')}
          </p>
          <p>
            {t('story.p2')} <strong className="text-foreground">{t('story.p2Bold')}</strong> {t('story.p2After')}
          </p>
          <p>
            {t('story.p3')} <strong className="text-foreground">{t('story.p3Bold')}</strong>
          </p>
          <p>
            {t('story.p4')} <strong className="text-foreground">{t('story.p4Bold')}</strong> {t('story.p4After')} <strong className="text-foreground">{t('story.p4Mission')}</strong> {t('story.p4End')}
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6">
          <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t('values.pricing.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('values.pricing.description')}
          </p>
        </div>

        <div className="text-center p-6">
          <Code className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t('values.developers.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('values.developers.description')}
          </p>
        </div>

        <div className="text-center p-6">
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t('values.indie.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('values.indie.description')}
          </p>
        </div>
      </div>

      {/* Who is it for */}
      <div className="bg-accent/30 border rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {t('forWho.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              {t('forWho.startups.title')}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('forWho.startups.description')}
            </p>

            <h3 className="font-semibold text-foreground mb-2">
              {t('forWho.freelancers.title')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('forWho.freelancers.description')}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              {t('forWho.teams.title')}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('forWho.teams.description')}
            </p>

            <h3 className="font-semibold text-foreground mb-2">
              {t('forWho.personal.title')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('forWho.personal.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Simple Promise */}
      <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t('promise.title')}
        </h2>
        <p className="text-lg text-muted-foreground mb-4">
          <strong className="text-foreground">{t('promise.main')}</strong>
        </p>
        <p className="text-muted-foreground">
          {t('promise.description')}
        </p>
      </div>

      {/* Apoyo al proyecto */}
      <div className="mt-12 text-center bg-accent/30 border rounded-lg p-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t('support.title')}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t('support.description')}
        </p>
        <div className="flex justify-center">
          <a
            href='https://cafecito.app/juanjoles'
            rel='noopener'
            target='_blank'
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            {t('support.button')}
          </a>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {t('support.footer')}
        </p>
      </div>

      {/* Contact */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t('contact.title')}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t('contact.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://twitter.com/ankapulse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            🐦 @ankapulse
          </a>
        </div>
      </div>
    </div>
  );
}