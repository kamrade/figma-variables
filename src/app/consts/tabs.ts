export type ExportFormat = 'origin' | 'scss' | 'css-variables' | 'js';

export interface ITab {
  title: string;
  id: ExportFormat;
}

export const tabs: ITab[] = [{
  title: 'JS',
  id: 'js'
}, {
  title: 'SCSS',
  id: 'scss'
}, {
  title: 'CSS Variables',
  id: 'css-variables'
}, {
  title: 'Origin (Stringify)',
  id: 'origin'
}];