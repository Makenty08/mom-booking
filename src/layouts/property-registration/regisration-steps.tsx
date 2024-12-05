'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import { useAppDispatch } from '~/store/hooks';
import { removeProperty } from '~/feature/property/property-slice';
export function RegistrationSteps() {
  const pathNames = usePathname();
  const paths = pathNames?.split('/').filter(Boolean) || [];
  const routes = useMemo(
    () => [
      'about-your-place',
      'property',
      'services',
      'property-photo',
      'stand-out',
      'rooms',
      'rooms-photo',
      'facilities',
    ],
    [],
  );
  const initialProgress = routes.findIndex((route) => route === paths[paths.length - 1]);
  const [progress, setProgress] = useState<number>(initialProgress >= 0 ? initialProgress : 0);

  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialProgress >= 0) {
      router.push(`${routes[progress]}`);
    }
  }, [progress, routes, router, initialProgress]);

  const onBack = () => {
    setProgress((prev) => Math.max(0, prev - 1));
  };

  const onNext = () => {
    if (progress === routes.length - 1) {
      router.push('/hosting');
      dispatch(removeProperty());
    }
    setProgress((prev) => Math.min(routes.length - 1, prev + 1));
  };

  const progressPercentage = (progress / (routes.length - 1)) * 100;

  return (
    <>
      <div className="space-y-4 pb-5">
        <div>
          <Progress value={progressPercentage} className="w-[100%]" />
        </div>
        <div className="flex justify-between">
          <Button variant={'link'} onClick={onBack} disabled={progress === 0}>
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={progress === routes.length - 1}
            className={`${progress >= routes.length - 1 && 'hidden'} `}
          >
            Next
          </Button>
          <Button onClick={onNext} className={`${progress < routes.length - 1 && 'hidden'} `}>
            Finish
          </Button>
        </div>
      </div>
    </>
  );
}
