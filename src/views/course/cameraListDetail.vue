<template>
    <div class="app-container">
      <h1>Camera List Detail</h1>
      <div class="setting-control">
        <button v-for="(nav, index) in navList" :key="index" @click="navListClick(index)"
          :class="type == index ? '' : 'white'">
          {{ nav.name }}
        </button>
      </div>
		
      <div class="container">
        <keep-alive>
          <component
            :is="tabCurrentComponent"
            ref="tabCurrentComponentRef"
          ></component>
        </keep-alive>
      </div>
    </div>
  </template>
  <script src="../../api/course/cameraDetail.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.white {
	font-size: 12px;
    font-family: 'Open Sans', Arial, sans-serif;
	color: #333;
	// background-color: #fff;
	border: 1px solid #ccc;
	box-shadow: none;
}
button {
	// background-image: #0acbf7;
	background-image: linear-gradient(to left, #409EFF 90%, #409EFF 100%);
	// background-image: linear-gradient(to left, #0acbf7 0%, #1e3ddf 100%);
	border-radius: 4px;
	color: #ffffff;
	box-shadow: 0px 3px 6px rgba($color: #000000, $alpha: 0.1);
	cursor: pointer;
	&:hover {
		opacity: 0.2;
	}
	&:active {
		opacity: 0.7;
	}

	&.white {
		background-color: #ffffff;
		background-image: none;
		box-shadow: 0px 3px 6px rgba(17, 30, 87, 0.2);
		color: #848484;
	}
	&.black {
		background-color: #333333;
		background-image: none;
		box-shadow: 0px 3px 6px rgba(17, 30, 87, 0.2);
		color: #ffffff;
		border: none;
	}
}
.button:focus {
    outline: none;
}

 .setting {
		&-control {
			margin-top: 8px;
			// width: 66.875rem;
			width: 1095px;
			// margin: 0 auto;
			display: flex;
			margin-top: 10px;
			justify-content: space-between;

			button {
				width: 12.5rem;
				height: 2.5rem;
				border: none;
				outline: none;
				max-height: 48px;
			}
		}

		&__btn {
			position: absolute;
			top: 16px;
			right: 16px;
			z-index: 2002;
		}

		&-service-info,
		&-ota,
		&-version-management,
		&-service-plan,
		&-account-management {
			margin-top: 16px;
			position: relative;
		}

		&-service-info {
			width: 66.875rem;
			// margin: 0 auto;
			border-radius: 4px;
			box-shadow: 0 3px 6px rgba($color: #111e57, $alpha: 0.2);
			background-color: #ffffff;
			margin-top: 8px;
			padding: 13px 95px 58px 95px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			&-item {
				width: 30%;
				display: flex;
				flex-direction: column;
				align-items: center;

				&__info {
					width: 210px;
					height: 68px;
					border-radius: 4px;
					border: 1px solid #333333;
					padding: 8px;
					display: flex;
					justify-content: space-between;
					position: relative;

					&-title {
						font-size: 14px;
						font-weight: bold;
						color: #333333;
					}

					&-contact {
						font-size: 14px;
						font-weight: 400;
						color: #333333;
						outline: none;
						margin-top: 5px;
					}

					&-btn {
						position: absolute;
						right: 18px;

						a {
							font-size: 18px;
							margin-left: 5px;
							cursor: pointer;

							&::before {
								margin-left: 0;
							}
						}
					}
				}
			}
		}
	}

</style>
  