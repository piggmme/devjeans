<script lang="ts">
  import {costumeColorable} from 'src/store/costume'
</script>

<svg
  id="shirts"
  width="2048"
  height="2048"
  viewBox="0 0 2048 2048"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M1090 1103L1098 1072L1138 1051.5L1190.5 1044L1278 1034H1372V1096.5L1358.5 1182.5L1365 1222H1278L1300.5 1258.5L1372 1331.5L1358.5 1369L1324 1396.5L1253.5 1446L1169 1494.5L1080 1522.5L967 1543L845 1554L771 1534L751 1489L736.5 1423H677V1349.5L668 1281V1242H685L744 1222L783.5 1182.5L845 1194L936.5 1171.5L1027.5 1138L1090 1103Z"
    fill={$costumeColorable?.shirts?.fill || '#fff'}
    stroke="black"
  />
  <rect width="2048" height="2048" fill="url(#pattern0)" />
  <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlink:href="#image0_5_28" transform="scale(0.000488281)" />
    </pattern>
    <image id="image0_5_28" width="2048" height="2048" />
  </defs>
</svg>
