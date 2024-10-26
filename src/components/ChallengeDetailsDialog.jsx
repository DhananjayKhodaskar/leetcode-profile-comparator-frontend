import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have a Card component in your UI library
import { useGetChallengeByIdQuery } from "@/services/challenge";

const ChallengeDetailsDialog = ({ selectedChallengeId, isOpen, onClose }) => {
  const {
    data: response,
    error,
    isLoading,
  } = useGetChallengeByIdQuery(selectedChallengeId);
  const challenge = response?.data;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{challenge?.name}</DialogTitle>
          <DialogDescription>{challenge?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-auto">
          {challenge?.problems?.map((problem) => (
            <Card key={problem._id} className="border p-4 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {problem?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Difficulty: {problem?.difficulty}
                </p>
                <a
                  href={problem?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Problem
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeDetailsDialog;
