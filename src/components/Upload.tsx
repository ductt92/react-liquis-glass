import * as React from 'react';
import { cx } from '../utils';
import { useLocale } from './ConfigProvider';
import { CloudUploadIcon, FileIcon, TrashIcon } from '../icons';
import { Progress } from './Progress';

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  status?: 'uploading' | 'done' | 'error';
  percent?: number;
  file?: File;
  url?: string;
}

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxCount?: number;
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  /** Return false to reject a file. */
  beforeUpload?: (file: File) => boolean;
  /**
   * Called for each accepted file. Report progress with `onProgress(0–100)`
   * and resolve/reject to finish. Without it, files are marked done instantly.
   */
  customRequest?: (file: File, onProgress: (percent: number) => void) => Promise<string | void>;
  /** Dragger (drop zone) style. Default true. */
  dragger?: boolean;
  hint?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  showList?: boolean;
}

const fmtSize = (n: number) => (n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`);
let uidSeed = 0;

export const Upload: React.FC<UploadProps> = ({
  accept,
  multiple,
  disabled,
  maxCount,
  fileList,
  defaultFileList = [],
  onChange,
  beforeUpload,
  customRequest,
  dragger = true,
  hint,
  children,
  className,
  showList = true,
}) => {
  const t = useLocale();
  const [inner, setInner] = React.useState<UploadFile[]>(defaultFileList);
  const files = fileList ?? inner;
  const filesRef = React.useRef(files);
  filesRef.current = files;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);

  const commit = (next: UploadFile[]) => {
    filesRef.current = next;
    if (!fileList) setInner(next);
    onChange?.(next);
  };
  const patch = (uid: string, p: Partial<UploadFile>) => commit(filesRef.current.map((f) => (f.uid === uid ? { ...f, ...p } : f)));

  const add = (list: FileList | null) => {
    if (!list || disabled) return;
    let accepted = Array.from(list).filter((f) => beforeUpload?.(f) !== false);
    const entries: UploadFile[] = accepted.map((f) => ({
      uid: `lg-up-${++uidSeed}`,
      name: f.name,
      size: f.size,
      type: f.type,
      file: f,
      status: customRequest ? 'uploading' : 'done',
      percent: customRequest ? 0 : 100,
    }));
    let next = [...filesRef.current, ...entries];
    if (maxCount) next = next.slice(-maxCount);
    commit(next);
    if (customRequest)
      entries.forEach((e) =>
        customRequest(e.file!, (percent) => patch(e.uid, { percent }))
          .then((url) => patch(e.uid, { status: 'done', percent: 100, url: url || undefined }))
          .catch(() => patch(e.uid, { status: 'error' })),
      );
  };

  return (
    <div className={cx('lg-upload', disabled && 'lg-disabled', className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cx(dragger ? 'lg-upload-dragger lg-glass' : 'lg-upload-trigger', drag && 'lg-upload-drag')}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          add(e.dataTransfer.files);
        }}
      >
        <input ref={inputRef} type="file" hidden accept={accept} multiple={multiple} onChange={(e) => (add(e.target.files), (e.target.value = ''))} />
        {children ?? (
          <>
            <CloudUploadIcon className="lg-upload-icon" />
            <div className="lg-upload-text">{t.uploadHint}</div>
            {hint && <div className="lg-upload-hint">{hint}</div>}
          </>
        )}
      </div>
      {showList && files.length > 0 && (
        <ul className="lg-upload-list">
          {files.map((f) => (
            <li key={f.uid} className={cx('lg-upload-item lg-glass', f.status === 'error' && 'lg-upload-error')}>
              <FileIcon />
              <div className="lg-upload-item-main">
                <div className="lg-upload-item-name">{f.name}</div>
                {f.status === 'uploading' ? (
                  <Progress percent={f.percent ?? 0} size="sm" showInfo={false} />
                ) : (
                  <div className="lg-upload-item-meta">{f.status === 'error' ? t.uploadFailed : fmtSize(f.size)}</div>
                )}
              </div>
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => commit(files.filter((x) => x.uid !== f.uid))}>
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
