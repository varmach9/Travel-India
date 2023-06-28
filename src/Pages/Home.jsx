import React from 'react'
import Plan from '../Plan'
import SearchBar2 from '../SearchBar2'
const Home = () => {
//   console.log("home")
  return (
    <div>
    {window.screen.width>700?<div style={{display:"flex",height:`${window.screen.width*0.4}px`}}>
      <div style={{width:'20%',paddingLeft:"5%"}}><Plan/></div>
      <div style={{width:"70%"}}>
        <div style={{backgroundImage: "url(homebanner2.gif)", backgroundSize:"100%",width:"100%",height:"60%",margin:"auto",paddingTop:"15%"}}>
           <SearchBar2></SearchBar2>
        </div>
        
      </div>
      </div>:<div><div style={{display:"flex",height:`${window.screen.width*0.6}px`}}>
      {/* <div style={{width:'20%',paddingLeft:"5%"}}><Plan/></div> */}
      <div style={{width:"100%"}}>
        <div style={{backgroundImage: "url(homebanner2.gif)", backgroundSize:"100%",width:"100%",height:"60%",margin:"auto",paddingTop:"15%"}}>
           <SearchBar2></SearchBar2>
        </div>
      </div>
	  </div>
	  <div style={{width:'80%',paddingLeft:"5%",height:"300px"}}><Plan/></div>
      </div>}

      {/* inspired from yatra.com */}
      <div class="full oddEven" id="tiles">
	<section class="cg-container clearfix regions">
					<h1 style={{marginBottom:"30px",fontSize:`${window.screen.width>700?40:30}px`}}>Regions in India</h1>
				<ul class="imageList pb40 ">
											<li>
					<figure class="prel full">
						<a target=" " class="fl" href="https://www.yatra.com/india-tourism/north-india-guide">
							
														<img title="north india" alt="north india" data-cfill="fill" data-gauto="auto" data-quality="auto" data-width="373" data-height="248" data-fauto="jpg" src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1466686625/Ladakh_1466686621.jpg" data-src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1466686625/Ladakh_1466686621.jpg" height="248" width="373"/>
							<span class="caption">North India</span>
							<span class="overlay-cityguide"></span>
						</a>
					</figure>
				</li>
															<li>
					<figure class="prel full">
						<a target=" " class="fl" href="https://www.yatra.com/india-tourism/south-india-guide">
							
														<img title="south india" alt="south india" data-cfill="fill" data-gauto="auto" data-quality="auto" data-width="373" data-height="248" data-fauto="jpg" src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1433922285/Hampi_14.jpg" data-src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1433922285/Hampi_14.jpg" height="248" width="373"/>
							<span class="caption">South India</span>
							<span class="overlay-cityguide"></span>
						</a>
					</figure>
				</li>
															<li>
					<figure class="prel full">
						<a target=" " class="fl" href="https://www.yatra.com/india-tourism/west-india-guide">
							
														<img title="west india" alt="west india" data-cfill="fill" data-gauto="auto" data-quality="auto" data-width="373" data-height="248" data-fauto="jpg" src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1436339077/Goa_104.jpg" data-src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1436339077/Goa_104.jpg" height="248" width="373"/>
							<span class="caption">West India</span>
							<span class="overlay-cityguide"></span>
						</a>
					</figure>
				</li>
															<li>
					<figure class="prel full">
						<a target=" " class="fl" href="https://www.yatra.com/india-tourism/east-india-guide">
							
														<img title="east india" alt="east india" data-cfill="fill" data-gauto="auto" data-quality="auto" data-width="373" data-height="248" data-fauto="jpg" src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1433742759/Darjeeling_11.jpg" data-src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1433742759/Darjeeling_11.jpg" height="248" width="373"/>
							<span class="caption">East India</span>
							<span class="overlay-cityguide"></span>
						</a>
					</figure>
				</li>
															<li>
					<figure class="prel full">
						<a target=" " class="fl" href="https://www.yatra.com/india-tourism/north-east-india-guide">
							
														<img title="north east india" alt="north east india" data-cfill="fill" data-gauto="auto" data-quality="auto" data-width="373" data-height="248" data-fauto="jpg" src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1462947648/Meghalaya4345_1462947640.jpg" data-src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1462947648/Meghalaya4345_1462947640.jpg" height="248" width="373"/>
							<span class="caption">North east India</span>
							<span class="overlay-cityguide"></span>
						</a>
					</figure>
				</li>
															<li>
					<figure class="prel full">
						<a target=" " class="fl" href="https://www.yatra.com/india-tourism/central-india-guide">
							
														<img title="central india" alt="central india" data-cfill="fill" data-gauto="auto" data-quality="auto" data-width="373" data-height="248" data-fauto="jpg" src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1453979262/Orchha_101.jpg" data-src="https://imgcld.yatra.com/ytimages/image/upload/t_seo_Magnum_w_373_h_248_c_fill_g_auto_q_auto:good_f_jpg/v1453979262/Orchha_101.jpg" height="248" width="373"/>
							<span class="caption">Central India</span>
							<span class="overlay-cityguide"></span>
						</a>
					</figure>
				</li>
									</ul>
	</section>
</div>
      </div>
  )
}

export default Home