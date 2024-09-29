import ProductShowcase from "@/components/products/product-showcase";

export default function Page() {
  return (
    <main>
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-12">
        <div className="flex-1 bg-gray-300">
          <img
            src="https://assets.ajio.com/medias/sys_master/root/20231205/G3z0/656ed440ddf7791519b1e6e2/-473Wx593H-461119105-blue-MODEL.jpg"
            alt=""
          />
          <div className="flex space-x-4">
            <div className="w-20 h-20  bg-gray-300"></div>
            <div className="w-20 h-20  bg-gray-500"></div>
            <div className="w-20 h-20  bg-gray-200"></div>
            <div className="w-20 h-20  bg-gray-800"></div>
          </div>
        </div>
        <div className="flex-1 bg-gray-500">
          <ProductShowcase />
        </div>
      </section>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
        assumenda magnam iusto voluptatum quaerat. Pariatur culpa fugiat,
        voluptatem consequuntur possimus porro quidem dolorem dolore corrupti.
        Doloremque expedita dolore nulla id quaerat fuga! Ipsum nobis error
        esse. Cupiditate enim odio similique aspernatur quod! Fuga similique
        quos error accusamus dolorum voluptatibus, aspernatur alias aperiam
        architecto, amet placeat vero unde laborum nostrum, laudantium ad
        reprehenderit explicabo hic optio incidunt earum harum eveniet. Dolores
        perferendis temporibus ducimus ea ipsam iste illo consequuntur rem
        perspiciatis modi possimus asperiores qui neque facere, doloremque vero
        eius aspernatur! Fuga unde provident pariatur, cumque beatae modi qui
        explicabo alias quibusdam ab? Aut impedit modi aliquam. Vitae, tempora
        debitis in ex obcaecati ipsam eos amet sequi excepturi, numquam ratione
        libero. Ratione corrupti reprehenderit rem tempora odio quam, cumque,
        nostrum ducimus repellat voluptatum pariatur delectus molestiae
        accusantium animi nisi quos cum non quidem modi debitis? Hic ducimus
        expedita nihil obcaecati cumque, sunt commodi itaque cupiditate error
        aperiam voluptatibus doloremque voluptatem vitae accusantium, optio
        quaerat, magni assumenda at minima tempora culpa eligendi libero quasi.
        Tempora mollitia, ab possimus nihil inventore deleniti dolor ad quae?
        Quod accusantium velit exercitationem minus vitae, unde similique cumque
        dolorum cupiditate ratione fugit odio nostrum voluptatem sequi molestiae
        pariatur repellendus repellat voluptatibus. Maxime eos unde inventore.
        Recusandae quod unde cumque id et labore libero, excepturi, architecto
        vel doloribus saepe dolor repellendus voluptas aliquid optio aliquam
        nisi odio! Sequi cumque magnam enim rem culpa dolore alias provident,
        dicta architecto natus tenetur totam illo fugit aliquid quos aliquam
        fugiat dolores beatae. Nisi aliquam numquam saepe, amet mollitia
        exercitationem adipisci laboriosam porro sit assumenda voluptate et
        placeat natus, nobis accusamus sint animi esse ad tenetur tempora.
        Quaerat natus voluptas deleniti quia dolore corrupti debitis sapiente,
        repudiandae rerum incidunt praesentium! Unde cupiditate sunt eaque
        tempore! Perferendis dolorum sint eum voluptate, nemo voluptatibus.
      </div>
    </main>
  );
}
