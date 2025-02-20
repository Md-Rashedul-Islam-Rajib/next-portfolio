'use client'
import { useGetAllMessagesQuery } from "@/redux/features/messages/messageApi";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { TMessage } from "@/types/message.types";

const MessagesPage = () => {
  const { data,isLoading } = useGetAllMessagesQuery(undefined);
  const messages = data?.data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

   if (isLoading)
     return (
       <p className="text-center text-lg font-semibold mt-[30%]">Loading...</p>
     );
  if (!messages || messages.length === 0) {
    return (
      <div className="flex justify-center gap-1 text-4xl font-semibold mt-[20%]">
        <Icon icon="mingcute:empty-box-line" width="45" height="45" />
        No Messages Found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Messages</h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200 dark:border-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="px-4 py-2 text-left">Name</TableHead>
              <TableHead className="px-4 py-2 text-left">Email</TableHead>
              <TableHead className="px-4 py-2 text-left">Message</TableHead>
              <TableHead className="px-4 py-2 text-left">Received</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {messages.map((msg: TMessage, index: number) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <TableRow
                    className="border-t border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <TableCell className="px-4 py-2">{msg.name}</TableCell>
                    <TableCell className="px-4 py-2">{msg.email}</TableCell>
                    <TableCell className="px-4 py-2 truncate max-w-xs">
                      {msg.message}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {new Date(msg.createdAt!).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                </DialogTrigger>

                {/* Modal for message details */}
                <DialogContent>
                  <DialogTitle>Message Details</DialogTitle>
                  {selectedMessage && (
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong> {selectedMessage.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedMessage.email}
                      </p>
                      <p>
                        <strong>Message:</strong> {selectedMessage.message}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {/* <DialogFooter>
                    <Button variant="outline">Close</Button>
                  </DialogFooter> */}
                </DialogContent>
              </Dialog>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MessagesPage;
