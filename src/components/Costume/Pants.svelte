<script lang="ts">
  import {costumeColorable} from 'src/store/costume'
</script>

<svg
  id="pants"
  width="2048"
  height="2048"
  viewBox="0 0 2048 2048"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M1287.5 1415L1350.5 1352.5L1398.5 1346.5L1445 1364L1486.5 1406.5L1509 1470L1515.5 1563L1486.5 1663.5L1427.5 1743L1358 1810.5L1279 1840.5L1196.5 1826L1125.5 1791.5L1074.5 1743L1055 1697L999 1687V1697L965 1770L925 1777H836.5L756.5 1758.5L729 1663.5V1586.5L756.5 1532.5L801.5 1519H919L1062.5 1493.5L1182 1460L1287.5 1415Z"
    fill={$costumeColorable?.pants?.fill || '#ff0'}
    stroke="black"
  />
  <rect width="2048" height="2048" fill="url(#pattern0)" />
</svg>
