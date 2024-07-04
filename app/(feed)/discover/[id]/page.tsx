import { GetUserByID } from "@/lib/get";

export default async function User({params}: {params: {id: string}}){
    const user = await GetUserByID(params.id)
    return(
        <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
            <h2 className="text-xl font-bold p-4">{`${user?.firstName} ${user?.lastName}`}</h2>
        </div>  
        <div className="p-4">
            <div className="mb-4">
            <p className="text-gray-600">Course: {user?.course?.name}</p>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <ul className="list-disc pl-6">
                {user?.projects.map(project => (
                <li key={project.id}>
                    <p className="text-gray-700">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.description}</p>
                </li>
                ))}
            </ul>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Educations</h3>
            <ul className="list-disc pl-6">
                {user?.educations.map(education => (
                <li key={education.id}>
                    <p className="text-gray-700">{education.name}</p>
                    <p className="text-sm text-gray-500">{`${education.startDate} - ${education.endDate}`}</p>
                </li>
                ))}
            </ul>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <ul className="list-disc pl-6">
                {user?.skills.map(skill => (
                <li key={skill.id}>
                    <p className="text-gray-700">{skill.skill.name}</p>
                </li>
                ))}
            </ul>
            </div>
            <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Biography</h3>
            <p className="text-gray-700">{user?.biography}</p>
            </div>
        </div>
        </div>
    );
}