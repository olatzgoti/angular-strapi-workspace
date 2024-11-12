import type { Core } from '@strapi/strapi';
import utils from '@strapi/utils';
import { difference } from 'lodash';
import requiredRoles from '../config/required-roles';

export const seedRoles = async (strapi: Core.Strapi) => {
  for (const { name, type, description, actions } of requiredRoles) {
    let role = await strapi.query('plugin::users-permissions.role').findOne({
      select: ['id', 'name'],
      where: { name, type },
      populate: { permissions: { select: ['id', 'action'] } },
    });
    if (!role)
      try {
        role = await strapi.query('plugin::users-permissions.role').create({
          select: ['id', 'name'],
          data: {
            name,
            description,
            type,
          },
          populate: ['permissions'],
        });
        strapi.log.info(`Role created: '${name}'`);
      } catch (error) {
        strapi.log.error(`Error creating role '${name}'`, error);
      }

    const toCreateActions = difference(
      actions,
      role.permissions.map(({ action }) => action)
    );
    for (const action of toCreateActions)
      try {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: role.id,
          },
        });
        strapi.log.info(
          `Permission '${action}' created for '${role.name}' role.`
        );
      } catch (error) {
        strapi.log.error(
          `Error creating '${action}' permission for '${role.name}' role:`,
          error
        );
      }
  }
};

export const seedAdmin = async (strapi: Core.Strapi) => {
  const admin = utils.env.array('DEFAULT_ADMIN');
  if (admin?.length !== 3) return;

  const [firstname, email, password] = admin;

  let superAdminRole = await strapi.service('admin::role').getSuperAdmin();
  if (!superAdminRole) {
    await strapi.service('admin::role').createRolesIfNoneExist();
    superAdminRole = await strapi.service('admin::role').getSuperAdmin();
  }

  const userService = strapi.service('admin::user');
  let user = await userService.findOneByEmail(email, ['roles']);
  if (!user) {
    const adminUser = {
      firstname,
      lastname: 'Irontec',
      password,
      email,
      roles: [superAdminRole.id],
      isActive: true,
    };
    user = await userService.create(adminUser);
    strapi.log.info(
      `Default admin user seeded: ${firstname} Irontec (${email})`
    );
  }
  if (user.roles.every(({ id }) => id !== superAdminRole.id)) {
    await userService.updateById(user.id, { roles: [superAdminRole.id] });
    strapi.log.info(`'Super Admin' role set to default admin (${email})`);
  }
  if (!user.isActive) {
    await userService.updateById(user.id, { isActive: true });
    strapi.log.info(`Default admin reactivated (${email})`);
  }
};
