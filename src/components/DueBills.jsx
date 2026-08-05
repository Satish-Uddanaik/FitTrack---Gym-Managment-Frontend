const DueBills = ({ bills }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">

                Upcoming Due Bills

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th>Name</th>

                        <th>Next Bill</th>

                    </tr>

                </thead>

                <tbody>

                    {bills.map(member => (

                        <tr
                            key={member.id}
                            className="border-b"
                        >

                            <td>{member.fullName}</td>

                            <td>{member.nextBillDate}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default DueBills;