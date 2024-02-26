import React, { useState, useEffect } from 'react';
import { ProjectsDataSimilar } from '../../../Shared/ListOfProjectSimilar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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

    const [products, setProducts] = useState([]);
    const userId = useParams();

    useEffect(() => {
        const fetchProductByUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${userId.id}`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProductByUserId();
    }, [userId.id]);

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
                    {products.map((product) => (
                        <div className="project-card" key={product.productID}>

                            <div className='content-card'>
                                <div className='imgage'>
                                    <img src={product.productPicture} alt={product.productName} />
                                </div>
                                <div className='project-list-details'>
                                    <div className='project-list-title'>
                                        <h3 className='project-list-name'>{product.productName}</h3>
                                        <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{product.productRating}</h3>
                                    </div>
                                    <h4>Area: {product.productArea}</h4>
                                    <div className='project-list-cost'>
                                        ${product.productPrice} <a>/ night</a>
                                    </div>
                                </div>
                            </div>
                            <div className="button-group">
                                <button onClick={() => handleStatusChange(product.productID)}>Status</button>
                                <Link to={`/view-project-detail/${product.productID}`}>
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

