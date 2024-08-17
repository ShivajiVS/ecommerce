import { ProductsList } from "@/components/productsList";
import { DumyProducts } from "@/lib/dumyProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-justify relative dark:bg-zinc-800">
      <ProductsList products={DumyProducts} />

      {/* <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
          eligendi magnam ex quae architecto natus explicabo aut, incidunt ipsa
          similique excepturi exercitationem, reprehenderit accusantium id esse
          rerum voluptatem labore quam in repellat! Aut, fuga! Rem voluptatibus
          iure sunt rerum, quas odio officia sint impedit cum aperiam repellat
          aut non cupiditate eaque consequatur soluta praesentium ut hic
          placeat! Obcaecati dolore velit nesciunt vitae aut ipsam laborum,
          delectus labore inventore repellat adipisci, optio eos assumenda
          necessitatibus ad debitis dolores omnis. Ratione est cupiditate rerum
          blanditiis id, praesentium dolorem, distinctio laudantium eligendi
          fuga itaque unde incidunt eos sit veritatis aut ipsum quo. Voluptates.
        </p>
      </div> */}
    </main>
  );
}
