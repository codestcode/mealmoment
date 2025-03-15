import salt from 'D:/habeba/habeba/new work of DOM/chef-clu/src/img/salt (1).jpg';
import two from 'D:/habeba/habeba/new work of DOM/chef-clu/src/img/two.jpg';
import three from 'D:/habeba/habeba/new work of DOM/chef-clu/src/img/three.jpg';


export default function Cards() {
return(
<>
<div className="card-one">
  <div class="card">
    <div class="wrapper">
      <img src={salt} class="cover-image" />
    </div>
  </div>
</div>
<div className="card-two">
  <div class="card">
    <div class="wrapper">
      <img src={two} class="cover-image" />
    </div>
   </div></div>


  <div className="card-three">
  <div class="card">
    <div class="wrapper">
      <img src={three} class="cover-image" />
    </div>
   </div></div>


</>
)



}
