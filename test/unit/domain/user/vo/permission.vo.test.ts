import { PermissionVO } from "../../../../../src/domain/user/vo/permission.vo";

describe("PermissionVO", () => {
  test("should validate a valid PermissionVO instance", () => {
    const accountId = "example_account_id";
    const roles = ["role1", "role2"];

    const permissionPayload = { accountId, roles };
    const permissionVO = PermissionVO.create(permissionPayload);

    expect(permissionVO.value).toStrictEqual(permissionPayload);
  });

  test("should throw an error when creating a PermissionVO instance with empty accountId", () => {
    const accountId = "";
    const roles = ["role1", "role2"];

    const permissionPayload = { accountId, roles };

    expect(() => PermissionVO.create(permissionPayload)).toThrow(
      "AccountId must not be empty",
    );
  });
});
