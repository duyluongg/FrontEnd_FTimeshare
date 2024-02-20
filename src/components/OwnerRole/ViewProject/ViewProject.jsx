import React, { useState } from 'react';
import { ProjectsDataSimilar } from '../../../Shared/ListOfProjectSimilar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ViewProject() {

    const [projects, setProjects] = useState([]); // Thay [] bằng dữ liệu thực tế
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5; // Số lượng dự án mỗi trang

    // Tính toán index của dự án bắt đầu và dự án kết thúc cho mỗi trang
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    // Render danh sách các dự án
    // const renderProjects = currentProjects.map((project, index) => (
    //     <div className="project-card" key={index}>
    //         <h3>{project.title}</h3>
    //         <p>{project.description}</p>
    //         <div className="button-group">
    //             <button onClick={() => handleStatusChange(project.id)}>Chỉnh Status</button>
    //             <button onClick={() => handleViewFeedback(project.id)}>Xem Feedback</button>
    //         </div>
    //     </div>
    // ));

    // Xử lý chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Hàm xử lý khi người dùng bấm nút chỉnh trạng thái
    const handleStatusChange = (projectId) => {
        // Thực hiện logic chỉnh trạng thái ở đây
    };

    // Hàm xử lý khi người dùng bấm nút xem phản hồi
    const handleViewFeedback = (projectId) => {

    };

    // const ProjectSummary = ({ totalProjects, projectsSold, totalRevenue }) => {
    //     return (
    //         <div className="project-summary">
    //             <div className="card">
    //                 <h2>Tổng kết dự án</h2>
    //                 <p>Số dự án đã đăng: {totalProjects}</p>
    //                 <p>Số dự án đã bán được: {projectsSold}</p>
    //                 <p>Tổng số tiền đã thu được: {totalRevenue} đồng</p>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <>
            <div className="view-project-container">
                <div className='project-summary'>

                    <h2 className="view-project-title">Summary</h2>
                    <div className="card">

                        <div className="summary-row">
                            <p className="label">Number of projects posted:</p>
                            {/* <p className="value">{totalProjects}</p> */}
                            <p className="value">5</p>
                        </div>
                        <div className="summary-row">
                            <p className="label">Number of projects sold:</p>
                            {/* <p className="value">{projectsSold}</p> */}
                            <p className="value">3</p>
                        </div>
                        <div className="summary-row">
                            <p className="label">Total Amount:</p>
                            {/* <p className="value">{totalRevenue} đồng</p> */}
                            <p className="value">228.000.000 Vnđ</p>
                        </div>
                    </div>

                </div>
                <div className='list-project'>
                    <h2 className="view-project-title">My Project</h2>
                    {ProjectsDataSimilar.map((prjsimi) => (
                        <div className="project-card" key={prjsimi.id}>

                            <div className='content-card'>
                                <div className='imgage'>
                                    <img src={prjsimi.img} alt={prjsimi.name} />
                                </div>
                                <div className='project-list-detail'>
                                    <div className='project-list-title'>
                                        <h3 className='project-list-name'>{prjsimi.name}</h3>
                                        <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{prjsimi.feedback}</h3>
                                    </div>
                                    <h4>{prjsimi.adr}</h4>
                                    <div className='project-list-cost'>
                                        ${prjsimi.cost} <a>/ night</a>
                                    </div>
                                </div>
                            </div>
                            <div className="button-group">
                                <button onClick={() => handleStatusChange(project.id)}>Status</button>
                                <Link to={`/view-project-detail/${prjsimi.id}`}>
                                    <button>View Feedback</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="pagination">

                </div>
            </div>
        </>
    );
}

