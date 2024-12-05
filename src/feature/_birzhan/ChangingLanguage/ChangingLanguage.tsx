'use client';
import { Tooltip } from 'react-tooltip';
import style from './ChangingLanguage.module.scss';

import { useEffect, useState } from 'react';

import { cn } from '~/lib/utils';
import Image from 'next/image';

interface IChangingLanguage {
  onlyDesktop?: boolean;
}

export const ChangingLanguage: React.FC<IChangingLanguage> = ({ onlyDesktop = false }) => {
  const [open, setOpen] = useState(false);
  let locale = 'kk';

  return (
    <div className="hover:bg-[#e9f0f3] rounded-lg p-2">
      <div className={cn(onlyDesktop ? 'hidden' : 'flex gap-4   md:hidden')}>
        <button>
          <span
            className={cn(
              style.lngButton,
              locale === 'kk' ? style.lngActive : '',
              ' font-medium  p-[10px] block',
            )}
          >
            Қаз
          </span>
        </button>
        <button className={cn(' font-bold')}>
          {' '}
          <span
            className={cn(
              style.lngButton,
              locale === 'ru' ? style.lngActive : '',
              ' font-medium  p-[10px] block',
            )}
          >
            Рус
          </span>
        </button>
        <button>
          <span
            className={cn(
              style.lngButton,
              locale === 'en' ? style.lngActive : '',
              'font-medium p-[10px] block',
            )}
          >
            Eng
          </span>
        </button>
      </div>
      <button
        data-tooltip-id="changing-language"
        className={cn('h-6 text-sm items-center gap-1', onlyDesktop ? 'flex' : 'hidden md:flex ')}
        data-tooltip-offset={24}
      >
        {locale === 'kk' ? 'Қаз' : locale === 'ru' ? 'Rus' : 'Eng'}
        <Image
          src="/static/arrow-top.svg"
          className={cn('block h-6 w-6 duration-200', open ? '' : 'rotate-180')}
          alt="arrow"
          width={24}
          height={24}
        />
      </button>

      <div className="z-[1000] relative	">
        <Tooltip
          id="changing-language"
          className={cn(style.wrapperTooltip, 'drop-shadow-2xl')}
          openOnClick={true}
          clickable={true}
          noArrow={true}
          opacity={1}
          place={'bottom'}
          afterShow={() => {
            setOpen(true);
          }}
          afterHide={() => {
            setOpen(false);
          }}
        >
          <div
            className={cn(
              style.tooltip,
              'flex flex-col min-w-[208px] p-0 rounded-lg relative left-[21px] overflow-hidden',
            )}
          >
            <span className={cn('flex h-10 items-center pl-4 text-sm')}>Select language</span>
            <button
              className={cn('flex h-10 items-center px-4 duration-200 text-sm justify-between')}
            >
              <span>Русский</span>
              {locale === 'ru' && (
                <Image src="/icons/check.svg" alt="check" width={24} height={24} />
              )}
            </button>
            <button
              className={cn('flex h-10 items-center px-4 duration-200 text-sm justify-between')}
            >
              <span>Қазақша</span>
            </button>
            <button
              className={cn('flex h-10 items-center px-4 duration-200 text-sm justify-between')}
            >
              <span>English</span>
            </button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
