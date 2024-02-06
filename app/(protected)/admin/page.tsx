"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const [isPending, startTranstiion] = useTransition();

  const onServerActionClick = () => {
    startTranstiion(() => {
      admin().then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };

  const onApiRouteClick = () => {
    startTranstiion(() => {
      fetch("/api/admin").then((response) => {
        if (response.ok) {
          toast.success("Allowed API Route!");
        } else {
          toast.error("Forbidden API Route!");
        }
      });
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg shadow-md border p-3">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button
            // disabled={isPending}
            onClick={onApiRouteClick}
            className={cn("", isPending && "cursor-not-allowed")}
          >
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg shadow-md border p-3">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button
            onClick={onServerActionClick}
            // disabled={isPending}
            className={cn("", isPending && "cursor-not-allowed")}
          >
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
