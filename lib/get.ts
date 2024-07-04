import prisma from "./db";

export async function GetUserByID(id: string){
    try{
        const user = await prisma.user.findUnique({ where: { id }, include: { 
            course: true, achievement: true, projects: true,
            educations: true, skills: {
                select: { 
                    id: true,
                    skill: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }, role: true,
         } });
        return user;
    }catch{
        return null
    }
}
export async function GetUserByEMAIL(email: string){
    const user = await prisma.user.findUnique({ where: { email }, include: {
        course: true, achievement: true, projects: true, role: true,
        educations: true, skills: true
    } });
    return user;
}
export async function GetUsers(){
    const users = await prisma.user.findMany({
        where: { role: { name: "USER"} },
        include: { course: true }
    });
    return users;
}
export async function GetRecentUsers(limit = 10) {
    const recent = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { role: { name: "USER"} },
      take: limit,
      include: { course: true }
    });
    return recent;
}
export async function GetNumberOfUsers() {
    const count = await prisma.user.count({ where: {role: { name: "USER"} } });
    return count;
}

export async function GetCourses(){
    const courses = await prisma.course.findMany();
    return courses;
}

export async function GetEmailTokenByEMAIL(email: string){
    const emailToken = await prisma.emailToken.findFirst({ where: { email } });
    return emailToken;
}
export async function GetEmailTokenByTOKEN(token: string){
    const emailToken = await prisma.emailToken.findFirst({ where: { token } });
    return emailToken;
}
export async function GetPasswordTokenByEMAIL(email: string){
    const passwordResetToken = await prisma.passwordToken.findFirst({ where: { email } });
    return passwordResetToken;
}
export async function GetPasswordTokenByTOKEN(token: string){
    const passwordResetToken = await prisma.passwordToken.findFirst({ where: { token } });
    return passwordResetToken;
}

export async function GetSkills(){
    const skills = await prisma.skill.findMany();
    return skills;
}

export async function GetUserSkills(id: string){
    const skills = await prisma.userSkill.findMany({
        where: { userId: id },
        include: { skill: true }
    });
    return skills;
}

export async function GetFilteredUsers(
    idOrEmail: string | null,
    courseId: string | null,
    emailVerified: boolean,
    archieved: boolean,
    lock: boolean,
    alumni: boolean
){
    const whereClause: Record<string, any> = {};
    if(idOrEmail){
        idOrEmail = idOrEmail.replace("%", "@");
        if(idOrEmail.includes("@cdd.edu.ph")){
            whereClause.email = idOrEmail;
        }
        if(!idOrEmail.includes("@")){
            whereClause.schoolId = idOrEmail;
        }
    }
    if(courseId){
        whereClause.courseId = courseId;
    }
    const emailVerify = emailVerified ? true : false;
    whereClause.isEmailVerified = emailVerify;

    const archieve = archieved ? true : false;
    whereClause.isArchieved = archieve;

    const locked = lock ? true : false;
    whereClause.lock = locked;

    const isAlumni = alumni ? true : false;
    whereClause.isAlumni = isAlumni;

    console.log(whereClause)

    const users = await prisma.user.findMany({
        where: {
            AND: [
                {role: "USER"},
                whereClause
            ]
        },
        include: { course: true, }
    });
    return users

}
export async function getCourses(){
    return await prisma.course.findMany();
  }