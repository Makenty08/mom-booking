import React from 'react';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export function SummaryTabCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lionel Messi</CardTitle>
        <CardDescription>5 persons</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Check In: 22.03.2023</div>

        <div>Check Out 25.03.2023</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Messege</Button>
        <Button>Call</Button>
      </CardFooter>
    </Card>
  );
}
