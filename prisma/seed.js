const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@delian.com' },
        update: {},
        create: {
            email: 'admin@delian.com',
            name: 'Admin Delian',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    console.log('Seed success: Admin account created');
    console.log('Email: admin@delian.com');
    console.log('Password: admin123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
