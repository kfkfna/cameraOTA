import statistics from "@/api/statistics/statistics"
export default {
    data () {
        return {
            btnDisabled:false,
            //选择的哪一天
            day:'',
        }
    },
    methods: {
        generateData(){
            statistics.generateData(this.day)
            .then(response=>{
                this.$message({
                    type: "success",
                    message: "The data was generated successfully!"
                });
                this.btnDisabled=true;
            })
        }
    }
}