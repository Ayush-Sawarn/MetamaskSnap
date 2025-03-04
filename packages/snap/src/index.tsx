import type { OnInstallHandler, OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';
import { Copyable, Divider, Heading } from '@metamask/snaps-sdk/jsx';


/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Hello, <Bold>{origin}</Bold>!
              </Text>
              <Text>
                This custom confirmation is just for display purposes.
              </Text>
              <Text>
                But you can edit the snap source code to make it do something,
                if you want to!
              </Text>
            </Box>
          ),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

function apiGetFFInfo() {
  // mimic API call
  return {
    ffNumber: "ABCDE1234",
    firstName: "Ayush",
    lastName: "Sawarn"
  };
}

export const onInstall: OnInstallHandler = async () => {
  const ffInfo = apiGetFFInfo();

  const componentContent = (
    <Box>
      <Heading>Air India</Heading>
      <Text>Hi {ffInfo.firstName}, Welcome to Air India Snap!!</Text>
      <Text>This is your frequent flyer number:</Text>
      <Divider />
      <Copyable value={ffInfo.ffNumber} />
    </Box>
  );

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: componentContent,
    },
  });
};
