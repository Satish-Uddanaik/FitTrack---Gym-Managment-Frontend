const RecentMembers = ({ members }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">

                Recent Members

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th>Name</th>

                        <th>Mobile</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {members.map(member => (

                        <tr
                            key={member.id}
                            className="border-b"
                        >

                            <td>{member.fullName}</td>

                            <td>{member.mobile}</td>

                            <td>{member.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default RecentMembers;