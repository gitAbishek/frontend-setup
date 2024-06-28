import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, get, post, put } from "../api/client";
import { queryClient } from "../main";

const TEST_QUERY = {
  test: "test",
};

export const useGetAllAccommodation = ({
  limit = 8,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) =>
  useQuery({
    queryKey: [TEST_QUERY.test, limit, offset],
    queryFn: () =>
      get({
        url: "api/v1/packages/accommodations/list",
        params: { limit, offset },
      }),
    select: (response) => {
      return response;
    },
  });

export const useAddAccommodation = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({
        url: "api/v1/packages/accommodations/create/",
        body,
        contentType: "multipart/form-data",
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TEST_QUERY.test],
      });
      return response;
    },
  });

export const useUpdateAccommodation = () =>
  useMutation({
    mutationFn: ({ body, id }: { body: object; id: string }) =>
      put({
        url: `api/v1/packages/accomodation/${id}/`,
        body,
        contentType: "multipart/form-data",
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TEST_QUERY.test],
      });
      return response;
    },
  });

export const useDeleteAccommodation = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteApi({
        url: `api/v1/packages/accomodation/${id}`,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [TEST_QUERY.test],
      });
      return response;
    },
  });
