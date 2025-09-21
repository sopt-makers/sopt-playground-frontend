import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';

interface LogEntry {
  id: string;
  type: 'clickEvent' | 'submitEvent' | 'pageViewEvent' | 'impressionEvent' | 'userProperties';
  key?: string;
  params?: any[];
  properties?: any;
  timestamp: Date;
}

interface AmplitudeLogViewerProps {
  isDev?: boolean;
}

const AmplitudeLogViewer: FC<AmplitudeLogViewerProps> = ({ isDev = false }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const originalConsole = useRef<typeof console.log>();
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDev) return;

    // 원본 console.log 저장
    if (!originalConsole.current) {
      originalConsole.current = console.log;
    }

    // console.log 오버라이드
    console.log = (...args: any[]) => {
      // 원본 console.log 호출
      originalConsole.current?.(...args);

      // EventLogger 로그만 캡처
      if (typeof args[0] === 'string' && args[0].startsWith('[EventLogger.')) {
        const logType = args[0].match(/\[EventLogger\.(\w+)\]/)?.[1];
        if (logType) {
          const newLog: LogEntry = {
            id: Date.now() + Math.random().toString(),
            type: logType as LogEntry['type'],
            timestamp: new Date(),
          };

          if (logType === 'userProperties') {
            newLog.properties = args[1];
          } else {
            newLog.key = args[1];
            newLog.params = args.slice(2);
          }

          setLogs((prev) => {
            const newLogs = [...prev.slice(-49), newLog]; // 최대 50개 로그 유지
            // 다음 렌더링 사이클에서 스크롤을 맨 아래로 이동
            setTimeout(() => {
              if (logContainerRef.current) {
                logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
              }
            }, 0);
            return newLogs;
          });
        }
      }
    };

    // cleanup
    return () => {
      if (originalConsole.current) {
        console.log = originalConsole.current;
      }
    };
  }, [isDev]);

  if (!isDev) return null;

  return (
    <>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>📊 Amplitude Logs ({logs.length})</ToggleButton>

      {isVisible && (
        <LogViewer>
          <Header>
            <Title>Amplitude Event Logs</Title>
            <ClearButton onClick={() => setLogs([])}>Clear</ClearButton>
          </Header>
          <LogContainer ref={logContainerRef}>
            {logs.length === 0 ? (
              <EmptyMessage>No logs yet...</EmptyMessage>
            ) : (
              logs.map((log) => (
                <LogEntry key={log.id} logType={log.type}>
                  <LogHeader>
                    <EventHeader>
                      <EventTag logType={log.type}>{log.type}</EventTag>
                      {log.key && (
                        <LogKey>
                          <strong>{log.key}</strong>
                        </LogKey>
                      )}
                    </EventHeader>
                    <TimeStamp>{log.timestamp.toLocaleTimeString()}</TimeStamp>
                  </LogHeader>

                  {log.params && log.params.length > 0 && (
                    <LogTable>
                      <thead>
                        <LogTableRow>
                          <LogTableHeader>Properties</LogTableHeader>
                          <LogTableHeader>value</LogTableHeader>
                        </LogTableRow>
                      </thead>
                      <tbody>
                        {Object.entries(log.params[0] || {}).map(([key, value]) => (
                          <LogTableRow key={key}>
                            <LogTableCell isProperty>{key}</LogTableCell>
                            <LogTableCell>{String(value)}</LogTableCell>
                          </LogTableRow>
                        ))}
                      </tbody>
                    </LogTable>
                  )}
                  {log.properties && (
                    <LogTable>
                      <thead>
                        <LogTableRow>
                          <LogTableHeader>Properties</LogTableHeader>
                          <LogTableHeader>value</LogTableHeader>
                        </LogTableRow>
                      </thead>
                      <tbody>
                        {Object.entries(log.properties).map(([key, value]) => (
                          <LogTableRow key={key}>
                            <LogTableCell isProperty>{key}</LogTableCell>
                            <LogTableCell>{String(value)}</LogTableCell>
                          </LogTableRow>
                        ))}
                      </tbody>
                    </LogTable>
                  )}
                </LogEntry>
              ))
            )}
          </LogContainer>
        </LogViewer>
      )}
    </>
  );
};

export default AmplitudeLogViewer;

const ToggleButton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 30%);
  background-color: #007bff;
  cursor: pointer;
  padding: 8px 12px;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const EventHeader = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const LogViewer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 9998;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 40%);
  background-color: #1e1e1e;
  width: 400px;
  max-height: 500px;
  overflow: hidden;
  color: #fff;
  font-size: 11px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #444;
  background-color: #2d2d2d;
  padding: 12px;
`;

const Title = styled.span`
  font-weight: bold;
`;

const ClearButton = styled.button`
  border: none;
  border-radius: 3px;
  background-color: #f44;
  cursor: pointer;
  padding: 4px 8px;
  color: white;
  font-size: 10px;
`;

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;

interface LogEntryProps {
  logType: LogEntry['type'];
}

const getLogEntryBackground = (logType: LogEntry['type']) => {
  switch (logType) {
    case 'impressionEvent':
      return '#1a3a1a';
    case 'clickEvent':
      return '#1a1a3a';
    case 'pageViewEvent':
      return '#3a1a1a';
    default:
      return '#2a2a2a';
  }
};

const LogEntry = styled.div<LogEntryProps>`
  padding: 8px 12px;
`;

const LogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

interface EventTagProps {
  logType: LogEntry['type'];
}

const getEventTagColor = (logType: LogEntry['type']) => {
  switch (logType) {
    case 'impressionEvent':
      return '#4caf50';
    case 'clickEvent':
      return '#2196f3';
    case 'pageViewEvent':
      return '#ff9800';
    default:
      return '#9c27b0';
  }
};

const EventTag = styled.span<EventTagProps>`
  border-radius: 3px;
  background-color: ${({ logType }) => getEventTagColor(logType)};
  padding: 2px 6px;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const TimeStamp = styled.span`
  color: white;
  font-size: 9px;
`;

const LogKey = styled.div`
  margin-bottom: 2px;
  color: #ffeb3b;
`;

const LogTable = styled.table`
  margin-top: 4px;
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
`;

const LogTableRow = styled.tr``;

const LogTableHeader = styled.th`
  border: 1px solid #444;
  background-color: #333;
  padding: 6px 8px;
  text-align: left;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

interface LogTableCellProps {
  isProperty?: boolean;
}

const LogTableCell = styled.td<LogTableCellProps>`
  border: 1px solid #444;
  padding: 4px 8px;
  vertical-align: top;
  word-break: break-word;
  color: white;

  /* color: ${({ isProperty }) => (isProperty ? '#ffeb3b' : '#e0e0e0')}; */
  font-weight: ${({ isProperty }) => (isProperty ? 'bold' : 'normal')};
`;
