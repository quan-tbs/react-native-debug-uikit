import { useState } from 'react';
import type { PluginScreenProps } from '../../core/types';
import { NetworkInspectorList } from './NetworkInspectorList';
import { NetworkRequestDetail } from './NetworkRequestDetail';
import type { RequestItemData } from './components/RequestItem';

export function NetworkPlugin({ onClose }: PluginScreenProps) {
  const [screen, setScreen] = useState<'list' | 'detail'>('list');
  const [selectedRequest, setSelectedRequest] =
    useState<RequestItemData | null>(null);

  if (screen === 'detail' && selectedRequest) {
    return (
      <NetworkRequestDetail
        request={selectedRequest}
        onBack={() => {
          setScreen('list');
          setSelectedRequest(null);
        }}
        onClose={onClose}
      />
    );
  }

  return (
    <NetworkInspectorList
      onClose={onClose}
      onSelectRequest={(request) => {
        setSelectedRequest(request);
        setScreen('detail');
      }}
    />
  );
}
