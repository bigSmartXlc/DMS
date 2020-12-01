/**
 * description: PDF打印方法
 * author: mwhao
 * createdDate: 2019-11-16
*/

import html2canvas from "html2canvas"  // 导入pdf 打印依赖
import JSPDF from "./jspdf.js"       // 导入pdf 打印依赖
// 需在页面定义id:pdfCentent 进行包裹
// htmlTitle 导出的文件名称
// paperJspdf 导出文件纸张设置   参数1:p为横排 英文l为竖排   参数2:页面单位  参数3:纸张大小
// leftJspdf  导出文件左间距设置
// topJspdf   导出文件上间距设置
export const html2canvasd = function (htmlTitle, paperJspdf, leftJspdf, topJspdf) {
  var element = document.getElementById("pdfCentent")
  html2canvas(element, {
    logging: false
  }).then(function (canvas) {
    paperJspdf=paperJspdf || {
      a:"l",
      b:"mm",
      c:"a4"
    }
    var pdf = new JSPDF(paperJspdf.a, paperJspdf.b, paperJspdf.c)
    var ctx = canvas.getContext("2d")
    var a4w = 170; var a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
    var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
    var renderedHeight = 0
    while (renderedHeight < canvas.height) {
      var page = document.createElement("canvas")
      page.width = canvas.width
      page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页
      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      topJspdf=topJspdf || 10
      leftJspdf=leftJspdf || 10
      page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
      pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", leftJspdf, topJspdf, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面
      renderedHeight += imgHeight
      if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
      // delete page;
    }
    htmlTitle = htmlTitle || "导出的文件名称"
    pdf.save(htmlTitle + ".pdf")
  })
}
export default {html2canvasd}

