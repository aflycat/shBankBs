using GWServiceAPI.Net.Controllers;
using GWServiceAPI.Net.LibClass;
using GWServiceAPI.Net.Models;
using AlarmCenter.DataCenter;
using Microsoft.CSharp;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.CodeDom.Compiler;
using System.Web.Http;

namespace GWService.Api.Test.Controllers
{
    /// <summary>
    /// 自定义数据库接口，控制器名为Db,请求时不区分大小写
    /// </summary>
    public class DbController : ApiAuthController
    {
        /// <summary>
        /// 查询设备配置表
        /// </summary>
        [HttpGet]
        public object GetDataTableFromSQL()
        {
            
            DataResult dr = new DataResult();
			string sql = "select top 1 *  from WelcomingSpeech where Type=0 order by ID desc";
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }

        /// <summary>
        /// 查询单个设备配置
        /// </summary>
        /// <param name="equip_no">设备号</param>
        [HttpGet]
        public object get_equip_2(string equip_no)
        {
            DataResult dr = new DataResult();
            string sql = "select * from Equip where equip_no=" + equip_no;
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }

        /// <summary>
        /// 查询对应项
        /// </summary>
        /// <param name="equip_no">参数1</param>
        /// <param name="set_no">参数2</param>
        [HttpGet]
        public object GetSetParmItem(string equip_no, string set_no)
        {
            DataResult dr = new DataResult();
            //判断是否为空
            if (string.IsNullOrEmpty(equip_no) && string.IsNullOrEmpty(set_no))
            {
                return ApiCode.Code1003(dr);
            }
            string sql = "select * from setParm where equip_no ="+equip_no+" and set_no="+set_no;
            dr = ServerLib.GetDataTableSQL(sql);//内置接口，执行查询SQL
            return dr;
        }




        /// <summary>
        /// 插入数据
        /// </summary>
        /// <param name="obj">
        /// obj.name:参数1
        /// obj.age:参数2
        /// </param>
        [HttpPost]
        public object get_equip_3(JObject obj)
        {
            DataResult dr = new DataResult();
            //注意：post请求参数为JObject类型
            dynamic json = obj; //动态解析参数
            string allHTML = json.allHTML;
            string fileName = json.fileName;
            string number = json.number;
            string objoriginal = json.objoriginal;


            string sql = "insert into WelcomingSpeech(JSONContent,BGImage,Type,siginalVal) values('"+allHTML+"','"+fileName+"','"+number+"','"+objoriginal+"')";
            dr = ServerLib.ExecuteSQL(sql);//内置接口，执行查询SQL
            return dr;



            // if (string.IsNullOrEmpty(name) && string.IsNullOrEmpty(age))
            // {
            //     return ApiCode.Code1003(dr);
            // }
            
            // string str = "POST your input name:" + name + ",age:" + age;
            // dr.data = str;
            // return dr;
        }
    }
}
