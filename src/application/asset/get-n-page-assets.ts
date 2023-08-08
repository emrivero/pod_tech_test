import { PaginateRequest } from "../../domain/asset/request/paginate.request";
import { AssetBody } from "../../domain/asset/types/asset-body";
import { FilterPayload } from "../../domain/asset/types/filter-payload";
import { HttpClient } from "../../domain/common/interface/http.client";
import { Response } from "../../domain/common/types/response";
import { LoginRequest } from "../../domain/login/request/login.request";
import { LoginPayload } from "../../domain/login/types/login-payload";

/**
 * Get the n-th page asset
 * @param {HttpClient} httpClient
 * @param {string} accountId
 * @param {LoginPayload} loginPayload
 * @param {number} page
 * @param {FilterPayload} filter
 * @param {number} numberOfRequest
 * @returns {Promise<Response<AssetBody[]>>} the user response
 */
export const getNPageAsset = async (
  httpClient: HttpClient,
  accountId: string,
  loginPayload: LoginPayload,
  page: number,
  filter?: FilterPayload,
  numberOfRequest = 8,
): Promise<Response<AssetBody[]>[]> => {
  const login = new LoginRequest(loginPayload);
  const paginates = Array.from(
    { length: numberOfRequest },
    (_, i) =>
      new PaginateRequest<{ status?: FilterPayload }>({
        limit: 50,
        page: (page - 1) * numberOfRequest + i + 1,
        accountId,
        filter: filter ? { status: filter } : {},
      }),
  );

  const requests = paginates.map((paginate) =>
    httpClient.paginateAssets(paginate, login),
  );

  const responses = await Promise.allSettled(requests);

  return responses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value;
    }

    return {
      data: [],
      status: 500,
      statusText: "Internal server error",
    };
  });
};
