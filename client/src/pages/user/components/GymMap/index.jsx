import React from "react";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { LuSearch, LuMapPin } from "react-icons/lu";

export function GymMap() {
  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-1 w-full">
          <h4 className="text-lg font-bold">Find Nearby Gyms</h4>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[44%]",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="LuSearch locations..."
            size="sm"
            startContent={<LuSearch size={18} />}
            type="Lusearch"
          />
        </div>
      </CardHeader>
      <CardBody>
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <LuMapPin className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">
                Map view will be displayed here
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
