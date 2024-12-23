import { LangInterface } from "@app/interfaces/lang.interface";

export enum Languages {
  IT = 'it',
  EN = 'en'
};

export const Langs: LangInterface[] = [
  {
    code: Languages.IT,
    icon: '/italy.svg'
  },
  {
    code: Languages.EN,
    icon: '/england.svg'
  }
];
