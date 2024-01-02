export const adminMenu = [
    { //hệ thống
        name: 'menu.system.user', menus: [
            {

                name: 'menu.system.user-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.system.user-manage', link: '/system/user-manage',
            },
            {
                name: 'menu.system.manage-doctor', link: '/system/manage-doctor',
            },
            {
                name: 'menu.doctor.schedule-manage', link: '/doctor/schedule-manage',
            },

        ]
    },
    { //phòng khám
        name: 'menu.system.clinic', menus: [
            {
                name: 'menu.system.clinic-manage', link: '/system/clinic-manage'

            },
        ]
    },
    { //chuyên khoa
        name: 'menu.system.specialti', menus: [
            {
                name: 'menu.system.specialti-manage', link: '/system/specialti-manage'

            },
        ]
    },
];
export const doctorMenu = [
    { //hệ thống
        name: 'menu.doctor.user', menus: [
            {
                name: 'menu.doctor.schedule-manage', link: '/doctor/schedule-manage',
            },
            {
                name: 'menu.doctor.paitent-manage', link: '/doctor/paitent-manage',
            },
        ]
    },
];

