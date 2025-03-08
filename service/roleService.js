const Role = require("../models/roles");

exports.createRole = async (roleData) => {
    try {

        // Validating Required Fields
        const requiredFields = ["roleName", "permissions", "description", "status", "logId"];
        for (const field of requiredFields) {
            if (!roleData[field] || (typeof roleData[field] === "string" && roleData[field].trim() === "")) {
                throw new Error(`${field} is required.`);
            }
        }

        // Ensure `permissions` is a non-empty array
        if (!Array.isArray(roleData.permissions) || roleData.permissions.length === 0) {
            throw new Error("permissions must be a non-empty array.");
        }


        // Check if role name already exists
        const existingRole = await Role.findOne({
            $or: [
                { roleName: roleData.roleName }
            ]
        });

        if (existingRole) {
            throw new Error("role already exists.");
        }

        // Creating New Role Object
        const role = new Role({
            roleName: roleData.roleName,
            description: roleData.description,
            permissions: roleData.permissions,
            status: roleData.status || "active",
            logId: roleData.logId,
        });

        // Save role in Database
        const savedRole = await role.save();

        return { message: "Role added successfully", savedRole };
    } catch (error) {
        console.error("Error Creating role:", error.message);
        throw new Error(error.message);
    }
};

exports.fetchRoles = async () => {
    try {
        // Fetching  all roles
        const roles = await Role.find({}).select("-__v -logId -updatedAt -createdAt -description");

        if (!roles || roles.length === 0) {
            throw new Error("No roles found");
        }

        return { message: "roles retrieved successfully", roles };
    } catch (error) {
        console.error("Error Fetching roles:", error.message);
        throw new Error(error.message);
    }
};
