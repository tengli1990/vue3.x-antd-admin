import { ConvertComponentNameOptions } from '@/types/utils';

export function camelize (str: string): string {
  str = String(str);
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : '';
  });
}

export function kebab (str: string): string {
  str = String(str);
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function convertComponentName (componentName: string, { prefix = '', firstUpperCase = false }:ConvertComponentNameOptions): string {
  const pureName = componentName.replace(/^pi-/i, '');
  let camelizeName = `${camelize(`${prefix}${pureName}`)}`;
  if (firstUpperCase) {
    camelizeName = camelizeName.charAt(0).toUpperCase() + camelizeName.slice(1);
  }
  return camelizeName;
}
