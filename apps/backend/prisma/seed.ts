/* eslint-disable no-restricted-syntax */
import { PrismaClient } from "@prisma/client";
import { throwErr } from "@stackframe/stack-shared/dist/utils/errors";
import { hashPassword } from "@stackframe/stack-shared/dist/utils/password";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  const oldProject = await prisma.project.findUnique({
    where: {
      id: "internal",
    },
  });

  let createdProject;
  if (oldProject) {
    console.log("Internal project already exists, skipping its creation");
  } else {
    // Optional default admin user
    const adminEmail = process.env.STACK_DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.STACK_DEFAULT_ADMIN_PASSWORD;

    // Optionally disable sign up
    const signUpEnabled = process.env.STACK_SIGN_UP_DISABLED !== "true";

    createdProject = await prisma.project.upsert({
      where: {
        id: "internal",
      },
      create: {
        id: "internal",
        displayName: "Stack Dashboard",
        description: "Stack's admin dashboard",
        isProductionMode: false,
        apiKeySets: {
          create: [
            {
              description: "Internal API key set",
              publishableClientKey: "this-publishable-client-key-is-for-local-development-only",
              secretServerKey: "this-secret-server-key-is-for-local-development-only",
              superSecretAdminKey: "this-super-secret-admin-key-is-for-local-development-only",
              expiresAt: new Date("2099-12-31T23:59:59Z"),
            },
          ],
        },
        config: {
          create: {
            allowLocalhost: true,
            oauthProviderConfigs: {
              create: (["github", "facebook", "google", "microsoft"] as const).map((id) => ({
                id,
                proxiedOAuthConfig: {
                  create: {
                    type: id.toUpperCase() as any,
                  },
                },
                projectUserOAuthAccounts: {
                  create: [],
                },
              })),
            },
            emailServiceConfig: {
              create: {
                proxiedEmailServiceConfig: {
                  create: {},
                },
              },
            },
            signUpEnabled,
            credentialEnabled: true,
            magicLinkEnabled: true,
            createTeamOnSignUp: false,
            clientTeamCreationEnabled: true,
          },
        },
        users:
          adminEmail && adminPassword
            ? {
                create: [
                  {
                    displayName: "Admin user",
                    primaryEmail: adminEmail,
                    passwordHash: await hashPassword(adminPassword),
                    primaryEmailVerified: true,
                    authWithEmail: true,
                  },
                ],
              }
            : undefined,
      },
      update: {},
    });
    console.log("Internal project created");
  }

  // eslint-disable-next-line no-restricted-syntax
  const adminGithubId = process.env.STACK_SETUP_ADMIN_GITHUB_ID;
  if (adminGithubId) {
    console.log("Found admin GitHub ID in environment variables, creating admin user...");
    await prisma.projectUser.upsert({
      where: {
        projectId_projectUserId: {
          projectId: "internal",
          projectUserId: "707156c3-0d1b-48cf-b09d-3171c7f613d5",
        },
      },
      create: {
        projectId: "internal",
        projectUserId: "707156c3-0d1b-48cf-b09d-3171c7f613d5",
        displayName: "Admin user generated by seed script",
        primaryEmailVerified: false,
        authWithEmail: false,
        serverMetadata: {
          managedProjectIds: [
            "internal",
            "12345678-1234-1234-1234-123456789abc", // intentionally invalid project ID to ensure we don't rely on project IDs being valid
          ],
        },
        projectUserOAuthAccounts: {
          create: [
            {
              providerAccountId: adminGithubId,
              projectConfigId: createdProject?.configId ?? oldProject?.configId ?? throwErr("No internal project config ID found"),
              oauthProviderConfigId: "github",
            },
          ],
        },
      },
      update: {},
    });
    console.log(`Admin user created (if it didn't already exist)`);
  } else {
    console.log("No admin GitHub ID found in environment variables, skipping admin user creation");
  }

  console.log("Seeding complete!");
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
