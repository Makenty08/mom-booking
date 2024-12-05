/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TAB_LIST_CATEGORY } from '../constants';
import { SummaryTabCard } from './summary-tab-card';
import { EmptyCard } from './empty-card';

export function ReservationsSummaryTabs() {
  return (
    <Tabs defaultValue="CheckingInTab" className="w-full">
      <TabsList className="flex justify-between overflow-scroll gap-2  no-scrollbar">
        {TAB_LIST_CATEGORY.map((tab, index) => (
          <TabsTrigger value={tab.slug} key={index} className=" text-md px-4">
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_LIST_CATEGORY.map((tab, index) => (
        <TabsContent
          value={tab.slug}
          key={index}
          className="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-3"
        >
          {index % 2 == 0 ? (
            <EmptyCard />
          ) : (
            Array(10)
              .fill(0)
              .map((_, index) => <SummaryTabCard key={index} />)
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
