'use client';

import { useState, useRef, useCallback } from 'react';
import { SupportedLanguage } from '../data/translations';

export function useCopilotVoice(
  locale: SupportedLanguage,
  onTranscribed: (text: string) => void
) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toggleVoice = useCallback(async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.requestData();
        } catch {}
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : '';

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (audioChunksRef.current.length === 0) {
          setIsTranscribing(false);
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setIsTranscribing(true);

        try {
          const formData = new FormData();
          formData.append('file', audioBlob, 'voice.webm');

          const res = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();
          if (data.success && data.text && data.text.trim()) {
            const transcribed = data.text.trim();
            onTranscribed(transcribed);
          }
        } catch (err) {
          console.error('Transcription error:', err);
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start(100);
      setIsRecording(true);
    } catch (err) {
      console.warn('Mic permission error:', err);
      const micAlerts: Record<string, string> = {
        ar: 'يرجى السماح بالوصول إلى الميكروفون في إعدادات المتصفح.',
        fr: 'Veuillez autoriser l\'accès au microphone dans les paramètres du navigateur.',
        en: 'Please allow microphone access in your browser settings.',
        derja: 'Samah lel mic fil paramètres mta3 el browser.',
      };
      alert(micAlerts[locale] ?? micAlerts['fr']);
      setIsRecording(false);
    }
  }, [isRecording, locale, onTranscribed]);

  return {
    isRecording,
    isTranscribing,
    toggleVoice,
  };
}
