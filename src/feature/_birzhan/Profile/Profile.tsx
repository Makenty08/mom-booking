import classNames from 'classnames';
import { Tooltip } from 'react-tooltip';
import style from './Profile.module.scss';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export const Profile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="hover:bg-[#e9f0f3] rounded-lg p-2">
      <button data-tooltip-id="profile" className="flex items-center" data-tooltip-offset={20}>
        <Image
          src="/static/person.svg"
          className="w-8 h-8 block"
          alt="student"
          width={16}
          height={16}
        />
        <Image
          src="/static/arrow-top.svg"
          className={classNames('block h-6 w-6 duration-200  mr-2', open ? '' : 'rotate-180')}
          alt="arrow"
          width={24}
          height={24}
        />
      </button>
      <Tooltip
        id="profile"
        className={classNames(style.wrapperTooltip, 'drop-shadow-2xl')}
        openOnClick={true}
        clickable={true}
        noArrow={true}
        opacity={1}
        afterShow={() => {
          setOpen(true);
        }}
        afterHide={() => {
          setOpen(false);
        }}
        place={'bottom-end'}
      >
        <div className={classNames(style.tooltip)}>
          <div className="p-4 w-80">
            <div className="flex mb-2 items-center gap-2 ">
              <Image
                src="/static/person.svg"
                className="w-14 h-14 block"
                alt="student"
                width={56}
                height={56}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">user</span>
                <span className={classNames(style.mail, ' text-xs')}>birka.zzz0207@gmail.com</span>
              </div>
            </div>
            <div className={classNames('rounded-lg', style.item)}>
              <Link href="/favorites">
                <span className="flex p-2 h-8 items-center">
                  <Image
                    className="w-4 h4 block mr-2"
                    src="/static/myActions.svg"
                    alt="myActions"
                    width={16}
                    height={16}
                  />{' '}
                  <span>My actions</span>
                </span>
              </Link>
            </div>
            <hr className={classNames('mt-2 mb-2 h-[1px]', style.hr)} />
            <div className={classNames('rounded-lg', style.item)}>
              <button>
                <span className="flex p-2 h-8 items-center">
                  <Image
                    className="w-4 h4 block mr-2"
                    src="/static/logout.svg"
                    alt="logout"
                    width={16}
                    height={16}
                  />{' '}
                  <span>exit</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </Tooltip>
    </div>
  );
};
