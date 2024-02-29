
<template>
	<view>
		
		  <SlotMachine  
			  ref="myLucky"
		    width="600rpx"
		    height="400rpx"
		    :blocks="blocks"
		    :slots="slots"
			  :prizes="prizes"
			  :defaultStyle="defaultStyle"
		    :defaultConfig="defaultConfig"
			  @end="endCallBack"
		  />
		
		<view>
			  <button @click="startCallBack()">开始</button>
		</view>
		
	</view>
</template>
 
<script>
    import SlotMachine from '@/components/@lucky-canvas/uni/slot-machine' 
  export default {
    components: { SlotMachine },
    data () {
      return {
        blocks: [
              { padding: '10px', background: '#869cfa', borderRadius: '10px' },
              { padding: '10px', background: '#e9e8fe', borderRadius: '10px' }
            ],
		slots: [
		  {  direction: 1 },
		  { direction: -1 },
		  {  direction: 1 },
		],
		prizes: [
		  {
		          background: '#bac5ee',
		          borderRadius: '10px',
		          imgs: [{
		            width: '70%',
					height:'70%',
		            top: '15%',
		            src: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
		          }]
		        },
			{
			        background: '#bac5ee',
			        borderRadius: '10px',
			        imgs: [{
			          width: '70%',
								height:'70%',
			          top: '15%',
			          src: 'https://cdn.uviewui.com/uview/swiper/swiper2.png'
			        }]
			      },{
		          background: '#bac5ee',
		          borderRadius: '10px',
		          imgs: [{
		            width: '70%',
					height:'70%',
		            top: '15%',
		            src: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		          }]
		        },
		],
		defaultStyle: {
		  borderRadius: Infinity,
		  background: '#bac5ee',
		  fontSize: '32px',
		  fontColor: '#333'
		},
		defaultConfig: {
		  rowSpacing: '25px',
		  colSpacing: '10px'
		}
      }
    },
	onLoad() {
		
	},
    methods: {
      // 点击抽奖按钮触发回调
      startCallBack () {
			// 先开始旋转
			this.$refs.myLucky.play()
			setTimeout(() => {
			  // 假设后端返回的中奖索引是0
			  const index = [2,0,1]
			  // 调用stop停止旋转并传递中奖索引
			  this.$refs.myLucky.stop(index)
			}, 3000)
      },
	 //  endClick(){
		//   const index = [0,2,1]
		//   // 调用stop停止旋转并传递中奖索引
		//   this.$refs.myLucky.stop(index)
	 //  },
      // 抽奖结束触发回调
      endCallBack (prize) {
        // 奖品详情
		console.log('---------中奖的：',prize)
        // alert('恭喜中奖: '+ prize.fonts[0].text)
      }
    }
  }
</script>